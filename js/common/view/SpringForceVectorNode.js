// Copyright 2002-2015, University of Colorado Boulder

/**
 * Displays the applied force.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var unitsNewtonsString = require( 'string!HOOKES_LAW/units.newtons' );

  /**
   * @param {Property.<number>} springForceProperty
   * @param {Property.<number>} displacementProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpringForceVectorNode( springForceProperty, displacementProperty, modelViewTransform, valuesVisibleProperty, options ) {

    options = options || {};

    var thisNode = this;

    var arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: HookesLawColors.SPRING_FORCE_VECTOR,
      stroke: 'black',
      tailWidth: 10,
      headWidth: 20,
      headHeight: 10
    } );

    var valueNode = new Text( '', {
      fill: HookesLawColors.SPRING_FORCE_VECTOR,
      font: new HookesLawFont( 14 ),
      bottom: arrowNode.top - 2 // above the arrow
    } );

    var backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'white', opacity: 0.8 } );

    options.children = [ arrowNode, backgroundNode, valueNode ];
    Node.call( this, options );

    springForceProperty.link( function( value ) {

      // update the vector
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, value * HookesLawConstants.UNIT_FORCE_VECTOR_LENGTH, 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( pattern_0value_1units, Util.toFixed( value, HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES ), unitsNewtonsString );

      // value position
      var margin = 5;
      if ( value === 0 ) {
        valueNode.right = -margin; // toward the left, so it doesn't overlap with spring force
      }
      else if ( valueNode.width + ( 2 * margin ) < arrowNode.width ) {
        valueNode.centerX = arrowNode.centerX;
      }
      else if ( value > 0 ) {
        valueNode.left = margin;
      }
      else {
        valueNode.right = -margin;
      }

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueNode.width, 1.1 * valueNode.height, 5, 5 );
      backgroundNode.center = valueNode.center;
    } );

    displacementProperty.link( function( displacement ) {
      thisNode.x = modelViewTransform.modelToViewX( displacement );
    } );

    valuesVisibleProperty.link( function( visible ) {
      valueNode.visible = visible;
    } );
  }

  return inherit( Node, SpringForceVectorNode );
} );
