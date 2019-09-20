// Copyright 2015-2019, University of Colorado Boulder

/**
 * Base type for force vectors.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const newtonsString = require( 'string!HOOKES_LAW/newtons' );
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  /**
   * @param {NumberProperty} forceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   * @constructor
   */
  function ForceVectorNode( forceProperty, valueVisibleProperty, options ) {

    options = _.extend( {
      fill: 'white',
      stroke: 'black',
      decimalPlaces: 0,
      unitLength: HookesLawConstants.UNIT_FORCE_X, // view length of a 1N vector
      alignZero: 'left', // how to align zero ('0 N') values, relative to the arrow tail, 'left'|'right'
      tandem: Tandem.required
    }, options );

    const arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: options.fill,
      stroke: options.stroke,
      tailWidth: 10,
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height
    } );

    const valueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.fill,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      bottom: arrowNode.top - 2 // above the arrow
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
    const backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'rgba( 255, 255, 255, 0.8 )' } );

    assert && assert( !options.children, 'ForceVectorNode sets children' );
    options.children = [ arrowNode, backgroundNode, valueNode ];

    forceProperty.link( function( value ) {

      // update the arrow
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, value * options.unitLength, 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( pattern0Value1UnitsString, Util.toFixed( Math.abs( value ), options.decimalPlaces ), newtonsString );

      // value position
      const margin = 5;
      if ( value === 0 ) {
        if ( options.alignZero === 'left' ) {
          valueNode.left = margin;
        }
        else {
          valueNode.right = -margin;
        }
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

    valueVisibleProperty.link( function( visible ) {
      valueNode.visible = backgroundNode.visible = visible;
    } );

    Node.call( this, options );
  }

  hookesLaw.register( 'ForceVectorNode', ForceVectorNode );

  return inherit( Node, ForceVectorNode );
} );
