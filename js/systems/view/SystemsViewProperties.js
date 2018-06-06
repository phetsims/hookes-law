// Copyright 2015-2018, University of Colorado Boulder

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
  var ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  /**
   * @constructor
   */
  function SystemsViewProperties() {

    // @public which system is visible
    this.seriesParallelProperty = new StringProperty( 'parallel', {
      validValues: [ 'series', 'parallel' ]
    } );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll );

    // @public how spring force is represented
    this.springForceRepresentationProperty = new StringProperty( 'total', {
      validValues: [ 'total', 'components' ]
    } );

    ViewProperties.call( this );
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
