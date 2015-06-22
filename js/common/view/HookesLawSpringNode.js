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
      unitDisplacementLength: 1,
      minLineWidth: 1, // lineWidth for minimum spring constant
      deltaLineWidth: 0.005 // increase in line width per 1 unit of spring constant increase
    }, options );

    var thisNode = this;

    ParametricSpringNode.call( this, options );

    // transform spring length from model to view coordinate frame
    spring.lengthProperty.link( function( length ) {
      thisNode.setLength( length * options.unitDisplacementLength );
    } );

    // spring constant determines lineWidth
    spring.springConstantProperty.link( function( springConstant ) {
      thisNode.setLineWidth( options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min ) );
    } );
  }

  return inherit( ParametricSpringNode, HookesLawSpringNode );
} );
