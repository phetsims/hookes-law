// Copyright 2018, University of Colorado Boulder

/**
 * Base type for view-specific Properties. These are the Properties that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ViewProperties( tandem ) {

    // @public is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'appliedForceVectorVisibleProperty' )
    } );

    // @public is the displacement vector visible?
    this.displacementVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'displacementVectorVisibleProperty' )
    } );

    // @public is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'equilibriumPositionVisibleProperty' )
    } );

    // @public are numeric values visible?
    this.valuesVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'valuesVisibleProperty' )
    } );
  }

  hookesLaw.register( 'ViewProperties', ViewProperties );

  return inherit( Object, ViewProperties, {

    // @public
    reset: function() {
      this.appliedForceVectorVisibleProperty.reset();
      this.displacementVectorVisibleProperty.reset();
      this.equilibriumPositionVisibleProperty.reset();
      this.valuesVisibleProperty.reset();
    }
  } );
} );
 