// Copyright 2015-2016, University of Colorado Boulder

/**
 * View-specific properties for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function SystemsViewProperties() {

    // check all CheckBoxes, to make development easier
    var checked = HookesLawQueryParameters.checkAll;

    // @public {string} which system is visible, 'series'|'parallel'
    this.seriesParallelProperty = new Property( 'parallel' );

    // @public {boolean} is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new Property( checked );

    // @public {boolean} is the spring force vector visible?
    this.springForceVectorVisibleProperty = new Property( checked );

    // @public {string} how spring force is represented, 'total'|'components'
    this.springForceRepresentationProperty = new Property( 'total' );

    // @public {boolean} is the displacement vector visible?
    this.displacementVectorVisibleProperty = new Property( checked );

    // @public {boolean} is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new Property( checked );

    // @public {boolean} are numeric values visible?
    this.valuesVisibleProperty = new Property( checked );
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
