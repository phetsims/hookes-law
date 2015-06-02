// Copyright 2002-2015, University of Colorado Boulder

/**
 * Vector representation of applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ForceVectorNode = require( 'HOOKES_LAW/common/view/ForceVectorNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Property.<number>} appliedForceProperty
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

  return inherit( ForceVectorNode, AppliedForceVectorNode );
} );
