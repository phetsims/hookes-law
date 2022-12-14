// Copyright 2015-2022, University of Colorado Boulder

/**
 * A specialization of ParametricSpringNode that adapts it to the Hooke's Law spring model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import ParametricSpringNode from '../../../../scenery-phet/js/ParametricSpringNode.js';
import hookesLaw from '../../hookesLaw.js';

export default class HookesLawSpringNode extends ParametricSpringNode {
  /**
   * @param {Spring} spring
   * @param {Object} [options]
   */
  constructor( spring, options ) {

    options = merge( {

      // ParametricSpringNode options
      loops: 10, // {number} number of loops in the coil
      pointsPerLoop: 40, // {number} number of points per loop
      radius: 10, // {number} radius of a loop with aspect ratio of 1:1
      aspectRatio: 4, // {number} y:x aspect ratio of the loop radius
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      minLineWidth: 3, // {number} lineWidth used to stroke the spring for minimum spring constant
      deltaLineWidth: 0.005, // increase in line width per 1 unit of spring constant increase
      leftEndLength: 15, // {number} length of the horizontal line added to the left end of the coil
      rightEndLength: 25, // {number} length of the horizontal line added to the right end of the coil
      boundsMethod: 'none' // {string} method used to compute bounds for scenery.Path components, see Path.boundsMethod
    }, options );

    super( options );

    // stretch or compress the spring
    spring.lengthProperty.link( length => {
      const coilLength = ( length * options.unitDisplacementLength ) - ( options.leftEndLength + options.rightEndLength );
      const xScale = coilLength / ( this.loopsProperty.value * this.radiusProperty.value );
      this.xScaleProperty.value = xScale;
    } );

    // spring constant determines lineWidth
    spring.springConstantProperty.link( springConstant => {
      const lineWidth = options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min );
      this.lineWidthProperty.value = lineWidth;
    } );
  }
}

hookesLaw.register( 'HookesLawSpringNode', HookesLawSpringNode );