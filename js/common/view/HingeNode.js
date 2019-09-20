// Copyright 2015-2019, University of Colorado Boulder

/**
 * Hinge for the robotic arm. This is the red piece that the pincers are connected to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const BODY_SIZE = new Dimension2( 9, 40 );
  const PIVOT_SIZE = new Dimension2( 26, 25 );
  const SCREW_RADIUS = 3;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function HingeNode( options ) {

    // piece that the pincers pivot in, shape described clockwise from upper-left
    const pivotNode = new Path( new Shape()
      .moveTo( 0, -0.25 * PIVOT_SIZE.height )
      .lineTo( PIVOT_SIZE.width, -0.5 * PIVOT_SIZE.height )
      .lineTo( PIVOT_SIZE.width, 0.5 * PIVOT_SIZE.height )
      .lineTo( 0, 0.25 * PIVOT_SIZE.height )
      .close(), {
      fill: HookesLawColors.HINGE,
      stroke: 'black'
    } );

    // pin at the pivot point
    const pinNode = new Circle( SCREW_RADIUS, {
      fill: 'white',
      stroke: 'black',
      centerX: pivotNode.left + 10,
      centerY: pivotNode.centerY
    } );

    // center of the pin
    const pinCenterNode = new Circle( 0.45 * SCREW_RADIUS, {
      fill: 'black',
      center: pinNode.center
    } );

    // body of the hinge, shape described clockwise from top of arc
    const theta = Math.atan( ( 0.5 * BODY_SIZE.height ) / BODY_SIZE.width );
    const radius = ( 0.5 * BODY_SIZE.height ) / Math.sin( theta );
    const bodyNode = new Path( new Shape()
      .arc( 0, 0, radius, -theta, theta )
      .lineTo( 0, 0.5 * BODY_SIZE.height )
      .lineTo( 0, -0.5 * BODY_SIZE.height )
      .close(), {
      fill: HookesLawColors.HINGE,
      stroke: 'black',
      left: pivotNode.right - 1,
      centerY: pivotNode.centerY
    } );

    // specular highlight on the body
    const highlightNode = new Path( new Shape()
      .arc( 0, 4, 6, -0.75 * Math.PI, -0.25 * Math.PI )
      .arc( 0, -4, 6, 0.25 * Math.PI, 0.75 * Math.PI )
      .close(), {
      fill: 'white',
      left: bodyNode.left + 3,
      top: bodyNode.top + 3,
      scale: 0.85
    } );

    assert && assert( !options.children, 'HingeNode sets children' );
    options.children = [ pivotNode, pinNode, pinCenterNode, bodyNode, highlightNode ];

    Node.call( this, options );
  }

  hookesLaw.register( 'HingeNode', HingeNode );

  return inherit( Node, HingeNode );
} );
