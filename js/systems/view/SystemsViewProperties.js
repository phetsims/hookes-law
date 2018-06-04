// Copyright 2015-2016, University of Colorado Boulder

/**
 * View-specific properties for the "Systems" screen.
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
  var StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function SystemsViewProperties() {

    // check all Checkboxes, to make development easier
    var checked = HookesLawQueryParameters.checkAll;

    // @public which system is visible
    this.seriesParallelProperty = new StringProperty( 'parallel', {
      validValues: [ 'series', 'parallel' ]
    } );

    // @public {boolean} is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( checked );

    // @public how spring force is represented
    this.springForceRepresentationProperty = new StringProperty( 'total', {
      validValues: [ 'total', 'components' ]
    } );

    // @public is the displacement vector visible?
    this.displacementVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new BooleanProperty( checked );

    // @public are numeric values visible?
    this.valuesVisibleProperty = new BooleanProperty( checked );
  }

  hookesLaw.register( 'SystemsViewProperties', SystemsViewProperties );

  return inherit( Object, SystemsViewProperties, {

    // @public
    reset: function() {
      this.seriesParallelProperty.reset();
      this.appliedForceVectorVisibleProperty.reset();
      this.springForceVectorVisibleProperty.reset();
      this.springForceRepresentationProperty.reset();
      this.displacementVectorVisibleProperty.reset();
      this.equilibriumPositionVisibleProperty.reset();
      this.valuesVisibleProperty.reset();
    }
  } );
} );
