// Copyright 2002-2015, University of Colorado Boulder

/**
 * Displays the spring displacement.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var metersString = require( 'string!HOOKES_LAW/meters' );

  /**
   * @param {Property.<number>} displacementProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementVectorNode( displacementProperty, modelViewTransform, valuesVisibleProperty, options ) {

    options = options || {};

    var arrowNode = new LineArrowNode( 0, 0, 1, 0, {
      stroke: HookesLawColors.DISPLACEMENT,
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
      headLineWidth: 3,
      tailLineWidth: 3
    } );

    var valueNode = new Text( '', {
      fill: HookesLawColors.DISPLACEMENT,
      font: new HookesLawFont( 14 ),
      top: arrowNode.bottom + 2 // below the arrow
    } );

    var backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'white', opacity: 0.8 } );

    var verticalLine = new Line( 0, 0, 0, 20, {
      stroke: 'black',
      lineWidth: 2,
      centerY: arrowNode.centerY
    } );

    options.children = [ verticalLine, arrowNode, backgroundNode, valueNode ];
    Node.call( this, options );

    displacementProperty.link( function( value ) {

      // update the vector
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, modelViewTransform.modelToViewX( value ), 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( pattern_0value_1units, Util.toFixed( Math.abs( value ), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES ), metersString );

      // center value on arrow
      valueNode.centerX = ( value === 0 ) ? 0 : arrowNode.centerX;

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueNode.width, 1.1 * valueNode.height, 5, 5 );
      backgroundNode.center = valueNode.center;
    } );

    valuesVisibleProperty.link( function( visible ) {
      valueNode.visible = backgroundNode.visible = visible;
    } );
  }

  return inherit( Node, DisplacementVectorNode );
} );
