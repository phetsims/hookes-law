// Copyright 2015-2023, University of Colorado Boulder

/**
 * HookesLawSpringNode is a specialization of ParametricSpringNode that adapts it to the Hooke's Law spring model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import ParametricSpringNode, { ParametricSpringNodeOptions } from '../../../../scenery-phet/js/ParametricSpringNode.js';
import hookesLaw from '../../hookesLaw.js';
import Spring from '../model/Spring.js';

type SelfOptions = {
  unitDisplacementLength?: number; // view length of 1 meter of displacement
  minLineWidth?: number; // lineWidth used to stroke the spring for minimum spring constant
  deltaLineWidth?: number; // increase in line width per 1 unit of spring constant increase
  leftEndLength?: number; // length of the horizontal line added to the left end of the coil
  rightEndLength?: number; // length of the horizontal line added to the right end of the coil
};

type HookesLawSpringNodeOptions = SelfOptions & ParametricSpringNodeOptions;

export default class HookesLawSpringNode extends ParametricSpringNode {

  public constructor( spring: Spring, providedOptions?: HookesLawSpringNodeOptions ) {

    const options = optionize<HookesLawSpringNodeOptions, SelfOptions, ParametricSpringNodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1,
      minLineWidth: 3,
      deltaLineWidth: 0.005,
      leftEndLength: 15,
      rightEndLength: 25,

      // ParametricSpringNodeOptions
      loops: 10, // number of loops in the coil
      pointsPerLoop: 40, // number of points per loop
      radius: 10, // radius of a loop with aspect ratio of 1:1
      aspectRatio: 4, // y:x aspect ratio of the loop radius
      boundsMethod: 'none' // method used to compute bounds for phet.scenery.Path components, see Path.boundsMethod
    }, providedOptions );

    super( options );

    // stretch or compress the spring
    spring.lengthProperty.link( length => {
      const coilLength = ( length * options.unitDisplacementLength ) - ( options.leftEndLength + options.rightEndLength );
      this.xScaleProperty.value = coilLength / ( this.loopsProperty.value * this.radiusProperty.value );
    } );

    // spring constant determines lineWidth
    spring.springConstantProperty.link( springConstant => {
      this.lineWidthProperty.value =
        options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min );
    } );
  }
}

hookesLaw.register( 'HookesLawSpringNode', HookesLawSpringNode );