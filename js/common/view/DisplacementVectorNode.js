// Copyright 2002-2015, University of Colorado Boulder

/**
 * Displays the spring displacement.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont= require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var unitsMetersString = require( 'string!HOOKES_LAW/units.meters' );

  /**
   * @param {Property.<number>} displacementProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementVectorNode( displacementProperty, modelViewTransform, valuesVisibleProperty, options ) {

    options = options || {};

    var arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: HookesLawColors.DISPLACEMENT_VECTOR,
      stroke: 'black',
      tailWidth: 10,
      headWidth: 20,
      headHeight: 10
    } );

    var valueNode = new Text( '', {
      fill: HookesLawColors.DISPLACEMENT_VECTOR,
      font: new HookesLawFont( 14 ),
      top: arrowNode.bottom + 3 // below the arrow
    } );

    var verticalLine = new Line( 0, 0, 0, 20, {
      stroke: 'black',
      lineWidth: 2,
      centerY: arrowNode.centerY
    } );

    options.children = [ verticalLine, arrowNode, valueNode ];
    Node.call( this, options );

    displacementProperty.link( function( value ) {

      // update the vector
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, modelViewTransform.modelToViewX( value ), 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( pattern_0value_1units, Util.toFixed( value, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES ), unitsMetersString );

      // center value on arrow
      valueNode.centerX = ( value === 0 ) ? 0 : arrowNode.centerX;
    } );

    valuesVisibleProperty.link( function( visible ) {
      valueNode.visible = visible;
    } );
  }

  return inherit( Node, DisplacementVectorNode );
} );
