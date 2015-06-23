// Copyright 2002-2015, University of Colorado Boulder

/**
 * A specialization of ParametricSpringNode that adapts it to the Hooke's Law spring model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ParametricSpringNode = require( 'HOOKES_LAW/common/view/ParametricSpringNode' );

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function HookesLawSpringNode( spring, options ) {

    options = _.extend( {
      loops: 10, // {number} number of loops in the coil
      aspectRatio: 4, // {number} y:x aspect ratio of the loop radius
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      minLineWidth: 1, // {number} lineWidth used to stroke the spring for minimum spring constant
      deltaLineWidth: 0.005, // increase in line width per 1 unit of spring constant increase
      leftEndLength: 15, // {number} length of the horizontal line added to the left end of the coil
      rightEndLength: 25 // {number} length of the horizontal line added to the right end of the coil
    }, options );

    // view-specific properties that control the look of ParametricSpringNode
    var propertySet = ParametricSpringNode.createPropertySet( {
      loops: options.loops,
      aspectRatio: options.aspectRatio
    } );
    ParametricSpringNode.call( this, propertySet, options );

    // stretch or compress the spring
    spring.lengthProperty.link( function( length ) {
      var coilLength = ( length * options.unitDisplacementLength ) - ( options.leftEndLength + options.rightEndLength );
      var xScale = coilLength / ( propertySet.loopsProperty.get() * propertySet.radiusProperty.get() );
      propertySet.xScaleProperty.set( xScale );
    } );

    // shrink the y dimension a bit when stretching the spring, to simulate radius change
    spring.displacementProperty.link( function( displacement ) {
      if ( displacement <= 0 ) {
        // compressed
        propertySet.aspectRatioProperty.set( options.aspectRatio );
      }
      else {
        // stretched
        propertySet.aspectRatioProperty.set( options.aspectRatio * ( 1 - 0.25 * displacement / spring.displacementRange.max ) );
      }
    } );

    // spring constant determines lineWidth
    spring.springConstantProperty.link( function( springConstant ) {
      var lineWidth = options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min );
      propertySet.lineWidthProperty.set( lineWidth );
    } );
  }

  return inherit( ParametricSpringNode, HookesLawSpringNode );
} );
