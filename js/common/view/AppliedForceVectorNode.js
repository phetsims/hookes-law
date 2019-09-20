// Copyright 2015-2019, University of Colorado Boulder

/**
 * Vector representation of applied force (F).
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
  const Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {NumberProperty} appliedForceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceVectorNode( appliedForceProperty, valueVisibleProperty, options ) {

    options = _.extend( {
      fill: HookesLawColors.APPLIED_FORCE,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      tandem: Tandem.required
    }, options );

    ForceVectorNode.call( this, appliedForceProperty, valueVisibleProperty, options );
  }

  hookesLaw.register( 'AppliedForceVectorNode', AppliedForceVectorNode );

  return inherit( ForceVectorNode, AppliedForceVectorNode );
} );
