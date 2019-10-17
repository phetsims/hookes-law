// Copyright 2015-2019, University of Colorado Boulder

/**
 * Vector representation of spring force (-F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ForceVectorNode = require( 'HOOKES_LAW/common/view/ForceVectorNode' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {NumberProperty} springForceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   * @constructor
   */
  function SpringForceVectorNode( springForceProperty, valueVisibleProperty, options ) {

    options = merge( {
      fill: HookesLawColors.SINGLE_SPRING,
      decimalPlaces: HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES,
      alignZero: 'right', // AppliedForceVectorNode use 'left', so we use 'right' so that '0' values won't overlap
      tandem: Tandem.required
    }, options );

    ForceVectorNode.call( this, springForceProperty, valueVisibleProperty, options );
  }

  hookesLaw.register( 'SpringForceVectorNode', SpringForceVectorNode );

  return inherit( ForceVectorNode, SpringForceVectorNode );
} );
