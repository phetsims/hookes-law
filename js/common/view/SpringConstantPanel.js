// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var springConstantString = require( 'string!HOOKES_LAW/springConstant' );
  var smallString = require( 'string!HOOKES_LAW/small' );
  var largeString = require( 'string!HOOKES_LAW/large' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: new HookesLawFont( 16 ) };
  var MINOR_TICK_SPACING = 5;

  /**
   * @param {Property.<boolean>} springConstantProperty
   * @param {Range} springConstantRange
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantPanel( springConstantProperty, springConstantRange, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15,
      resize: false
    }, options );

    var titleNode = new Text( springConstantString, { font: new HookesLawFont( 24 ) } );

    var slider = new HSlider( springConstantProperty, springConstantRange, {
      trackSize: new Dimension2( 150, 5 ),
      thumbFillEnabled: 'rgb(50,145,184)',
      thumbFillHighlighted: 'rgb(71,207,255)'
    } );
    slider.addMajorTick( springConstantRange.min, new Text( smallString, MAJOR_TICK_LABEL_OPTIONS ) );
    slider.addMajorTick( springConstantRange.max, new Text( largeString, MAJOR_TICK_LABEL_OPTIONS ) );
    for ( var i = springConstantRange.min + MINOR_TICK_SPACING; i < springConstantRange.max; ) {
      slider.addMinorTick( i );
      i += MINOR_TICK_SPACING;
    }

    var content = new VBox( {
      children: [
        titleNode,
        slider
      ],
      align: 'center',
      spacing: 10,
      resize: false
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SpringConstantPanel );
} );
