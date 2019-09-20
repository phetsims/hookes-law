// Copyright 2015-2019, University of Colorado Boulder

/**
 * View-specific properties for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  const inherit = require( 'PHET_CORE/inherit' );
  const StringProperty = require( 'AXON/StringProperty' );
  const ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SystemsViewProperties( tandem ) {

    ViewProperties.call( this, tandem );

    // @public which system is visible
    this.seriesParallelProperty = new StringProperty( 'parallel', {
      validValues: [ 'series', 'parallel' ],
      tandem: tandem.createTandem( 'seriesParallelProperty' )
    } );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'springForceVectorVisibleProperty' )
    } );

    // @public how spring force is represented
    this.springForceRepresentationProperty = new StringProperty( 'total', {
      validValues: [ 'total', 'components' ],
      tandem: tandem.createTandem( 'springForceRepresentationProperty' )
    } );
  }

  hookesLaw.register( 'SystemsViewProperties', SystemsViewProperties );

  return inherit( ViewProperties, SystemsViewProperties, {

    /**
     * @public
     * @override
     */
    reset: function() {
      this.seriesParallelProperty.reset();
      this.springForceVectorVisibleProperty.reset();
      this.springForceRepresentationProperty.reset();
      ViewProperties.prototype.reset.call( this );
    }
  } );
} );
