// Copyright 2002-2015, University of Colorado Boulder

//TODO migrate to scenery-phet
/**
 * Displays a numeric value in a rectangle.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property.<number>} valueProperty
   * @param {Range} valueRange
   * @param {string} units
   * @param {string} pattern
   * @param {Object} [options]
   * @constructor
   */
  function ValueDisplay( valueProperty, valueRange, units, pattern, options ) {

    options = _.extend( {
      font: new PhetFont( 24 ),
      decimalPlaces: 0
    }, options );

    // determine the widest value
    var minString = Util.toFixed( valueRange.min, options.decimalPlaces );
    var maxString = Util.toFixed( valueRange.max, options.decimalPlaces );
    var widestString = StringUtils.format( pattern, ( ( minString.length > maxString.length ) ? minString : maxString ), units );

    // value
    var valueNode = new Text( widestString, { font: options.font } );

    // background
    var xMargin = 0.1 * valueNode.width;
    var yMargin = 0.1 * valueNode.height;
    var background = new Rectangle( 0, 0, valueNode.width + xMargin + xMargin, valueNode.height + yMargin + yMargin, {
      fill: 'white',
      stroke: 'lightGray'
    } );
    valueNode.center = background.center;

    Node.call( this, { children: [ background, valueNode ] } );

    // display the value
    this.valueObserver = function( value ) {
      valueNode.text = StringUtils.format( pattern, Util.toFixed( value, options.decimalPlaces ), units );
      valueNode.right = background.right - xMargin;
    };
    this.valueProperty = valueProperty;
    this.valueProperty.link( this.valueObserver );
  }

  return inherit( Node, ValueDisplay, {

    dispose: function() {
      this.valueProperty.unlink( this.valueObserver );
    }
  } );
} );