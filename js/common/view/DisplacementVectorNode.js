// Copyright 2015, University of Colorado Boulder

/**
 * Vector representation of displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  /**
   * @param {Property.<number>} displacementProperty units = m
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementVectorNode( displacementProperty, options ) {

    options = _.extend( {
      verticalLineVisible: true,
      valueVisibleProperty: new Property( true ), // {Property.<boolean>} determines whether the value is visible
      unitDisplacementLength: 1
    }, options );

    var arrowNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );

    var valueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: HookesLawColors.DISPLACEMENT,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      top: arrowNode.bottom + 2 // below the arrow
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
    var backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'rgba( 255, 255, 255, 0.8 )' } );

    var verticalLine = new Line( 0, 0, 0, 20, {
      stroke: 'black',
      lineWidth: 2,
      centerY: arrowNode.centerY,
      visible: options.verticalLineVisible
    } );

    options.children = [ verticalLine, arrowNode, backgroundNode, valueNode ];

    displacementProperty.link( function( displacement ) {

      // update the vector
      arrowNode.visible = ( displacement !== 0 ); // since we can't draw a zero-length arrow
      if ( displacement !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, options.unitDisplacementLength * displacement, 0 );
      }

      // update the value
      var displacementText = Util.toFixed( Math.abs( displacement ), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      valueNode.text = StringUtils.format( pattern0Value1UnitsString, displacementText, metersString );

      // center value on arrow
      valueNode.centerX = ( displacement === 0 ) ? 0 : arrowNode.centerX;

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueNode.width, 1.1 * valueNode.height, 5, 5 );
      backgroundNode.center = valueNode.center;
    } );

    options.valueVisibleProperty.link( function( visible ) {
      valueNode.visible = backgroundNode.visible = visible;
    } );

    Node.call( this, options );
  }

  hookesLaw.register( 'DisplacementVectorNode', DisplacementVectorNode );

  return inherit( Node, DisplacementVectorNode );
} );
