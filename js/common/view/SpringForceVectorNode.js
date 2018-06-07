// Copyright 2015-2018, University of Colorado Boulder

/**
 * Vector representation of spring force (-F).
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
  var Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {NumberProperty} springForceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   * @constructor
   */
  function SpringForceVectorNode( springForceProperty, valueVisibleProperty, options ) {

    options = _.extend( {
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
