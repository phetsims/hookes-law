// Copyright 2015-2022, University of Colorado Boulder

/**
 * Hinge for the robotic arm. This is the red piece that the pincers are connected to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Circle, Node, NodeOptions, NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

// constants
const BODY_SIZE = new Dimension2( 9, 40 );
const PIVOT_SIZE = new Dimension2( 26, 25 );
const SCREW_RADIUS = 3;

type SelfOptions = EmptySelfOptions;

type HingeNodeOptions = SelfOptions & NodeTranslationOptions;

export default class HingeNode extends Node {

  public constructor( providedOptions?: HingeNodeOptions ) {

    const options = optionize<HingeNodeOptions, SelfOptions, NodeOptions>()( {
      // because we're setting options.children below
    }, providedOptions );

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

    options.children = [ pivotNode, pinNode, pinCenterNode, bodyNode, highlightNode ];

    super( options );
  }
}

hookesLaw.register( 'HingeNode', HingeNode );