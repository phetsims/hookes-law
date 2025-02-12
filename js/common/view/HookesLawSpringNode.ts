// Copyright 2015-2024, University of Colorado Boulder

/**
 * HookesLawSpringNode is a specialization of ParametricSpringNode that adapts it to the Hooke's Law spring model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ParametricSpringNode, { ParametricSpringNodeOptions } from '../../../../scenery-phet/js/ParametricSpringNode.js';
import hookesLaw from '../../hookesLaw.js';
import Spring from '../model/Spring.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';

type SelfOptions = {
  unitDisplacementLength?: number; // view length of 1 meter of displacement
  minLineWidth?: number; // lineWidth used to stroke the spring for minimum spring constant
  deltaLineWidth?: number; // increase in line width per 1 unit of spring constant increase
  leftEndLength?: number; // length of the horizontal line added to the left end of the coil
  rightEndLength?: number; // length of the horizontal line added to the right end of the coil
  parametricSpringNodeOptions?: StrictOmit<ParametricSpringNodeOptions, 'tandem'>; // propagated to ParametricSpringNode
};

type HookesLawSpringNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class HookesLawSpringNode extends Node {

  public constructor( spring: Spring, providedOptions: HookesLawSpringNodeOptions ) {

    const options = optionize<HookesLawSpringNodeOptions, StrictOmit<SelfOptions, 'parametricSpringNodeOptions'>, ParametricSpringNodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1,
      minLineWidth: 3,
      deltaLineWidth: 0.005,
      leftEndLength: 15,
      rightEndLength: 25,

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super( options );

    // Use composition instead of inheritance so that the many Properties in ParametricSpringNode do not get
    // instrumented for PhET-iO. It pollutes the Studio tree and PhET-iO API, and it's problematic that those
    // Properties are (currently) phetioReadOnly: false.
    // See https://github.com/phetsims/hookes-law/issues/113
    const springNode = new ParametricSpringNode( combineOptions<ParametricSpringNodeOptions>( {
      loops: 10, // number of loops in the coil
      pointsPerLoop: 40, // number of points per loop
      radius: 10, // radius of a loop with aspect ratio of 1:1
      aspectRatio: 4 // y:x aspect ratio of the loop radius
    }, options.parametricSpringNodeOptions ) );
    this.addChild( springNode );

    // stretch or compress the spring
    spring.lengthProperty.link( length => {
      const coilLength = ( length * options.unitDisplacementLength ) - ( options.leftEndLength + options.rightEndLength );
      springNode.xScaleProperty.value = coilLength / ( springNode.loopsProperty.value * springNode.radiusProperty.value );
    } );

    // spring constant determines lineWidth
    spring.springConstantProperty.link( springConstant => {
      springNode.lineWidthProperty.value =
        options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min );
    } );

    // For convenience in Studio, see https://github.com/phetsims/hookes-law/issues/113
    this.addLinkedElement( spring );
  }
}

hookesLaw.register( 'HookesLawSpringNode', HookesLawSpringNode );