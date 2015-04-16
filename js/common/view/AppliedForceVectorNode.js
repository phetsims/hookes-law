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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var unitsNewtonsString = require( 'string!HOOKES_LAW/units.newtons' );

  /**
   * @param {Property.<number>} appliedForceProperty
   * @param {Property.<number>} displacementProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceVectorNode( appliedForceProperty, displacementProperty, modelViewTransform, valuesVisibleProperty, options ) {

    options = options || {};

    var thisNode = this;

    var arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: HookesLawColors.APPLIED_FORCE_VECTOR,
      stroke: 'black',
      tailWidth: 10,
      headWidth: 20,
      headHeight: 10
    } );

    var valueNode = new Text( '', {
      font: new HookesLawFont( 14 ),
      bottom: arrowNode.top - 3 // above the arrow
    } );

    options.children = [ arrowNode, valueNode ];
    Node.call( this, options );

    appliedForceProperty.link( function( appliedForce ) {

      // update the vector
      arrowNode.visible = ( appliedForce !== 0 ); // since we can't draw a zero-length arrow
      if ( appliedForce !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, appliedForce * HookesLawConstants.UNIT_FORCE_VECTOR_LENGTH, 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( pattern_0value_1units, Util.toFixed( appliedForce, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES ), unitsNewtonsString );

      // center value on arrow
      valueNode.centerX = ( appliedForce === 0 ) ? 0 : arrowNode.centerX;
    } );

    displacementProperty.link( function( displacement ) {
      thisNode.x = modelViewTransform.modelToViewX( displacement );
    } );

    valuesVisibleProperty.link( function( visible ) {
      valueNode.visible = visible;
    } );
  }

  return inherit( Node, AppliedForceVectorNode );
} );
