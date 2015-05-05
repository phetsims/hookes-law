// Copyright 2002-2015, University of Colorado Boulder

/**
 * Displays the applied force.
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
   * @param {Property.<number>} displacementProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceVectorNode( appliedForceProperty, displacementProperty, modelViewTransform, valuesVisibleProperty, options ) {
    options.fill = HookesLawColors.APPLIED_FORCE_VECTOR;
    options.decimalPlaces = HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES;
    ForceVectorNode.call( this, appliedForceProperty, displacementProperty, modelViewTransform, valuesVisibleProperty, options );
  }

  return inherit( ForceVectorNode, AppliedForceVectorNode );
} );
