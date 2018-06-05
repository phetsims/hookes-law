// Copyright 2015-2018, University of Colorado Boulder

/**
 * Vector representation of applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ForceVectorNode = require( 'HOOKES_LAW/common/view/ForceVectorNode' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {NumberProperty} appliedForceProperty units = N
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceVectorNode( appliedForceProperty, options ) {

    options = _.extend( {
      fill: HookesLawColors.APPLIED_FORCE,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES
    }, options );

    ForceVectorNode.call( this, appliedForceProperty, options );
  }

  hookesLaw.register( 'AppliedForceVectorNode', AppliedForceVectorNode );

  return inherit( ForceVectorNode, AppliedForceVectorNode );
} );
