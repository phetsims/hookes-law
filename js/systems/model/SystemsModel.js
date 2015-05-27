// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ParallelSystem = require( 'HOOKES_LAW/systems/model/ParallelSystem' );
  var SeriesSystem = require( 'HOOKES_LAW/systems/model/SeriesSystem' );

  /**
   * @constructor
   */
  function SystemsModel() {

    var thisModel = this;

    this.seriesSystem = new SeriesSystem();
    this.parallelSystem = new ParallelSystem();

    // synchronize applied force F between the 2 systems
    assert && assert( this.seriesSystem.equivalentSpring.appliedForceRange.equals( thisModel.parallelSystem.equivalentSpring.appliedForceRange ) );
    this.seriesSystem.equivalentSpring.appliedForceProperty.link( function( appliedForce ) {
      thisModel.parallelSystem.equivalentSpring.appliedForceProperty.set( appliedForce );
    } );
    this.parallelSystem.equivalentSpring.appliedForceProperty.link( function( appliedForce ) {
      thisModel.seriesSystem.equivalentSpring.appliedForceProperty.set( appliedForce );
    } );

    // synchronize spring constant k1 (left and top) between the 2 systems
    assert && assert( this.seriesSystem.leftSpring.springConstantRange.equals( thisModel.parallelSystem.topSpring.springConstantRange ) );
    this.seriesSystem.leftSpring.springConstantProperty.link( function( springConstant ) {
      thisModel.parallelSystem.topSpring.springConstantProperty.set( springConstant );
    } );
    this.parallelSystem.topSpring.springConstantProperty.link( function( springConstant ) {
      thisModel.seriesSystem.leftSpring.springConstantProperty.set( springConstant );
    } );

    // synchronize spring constant k2 (right and bottom) between the 2 systems
    assert && assert( this.seriesSystem.rightSpring.springConstantRange.equals( thisModel.parallelSystem.bottomSpring.springConstantRange ) );
    this.seriesSystem.rightSpring.springConstantProperty.link( function( springConstant ) {
      thisModel.parallelSystem.bottomSpring.springConstantProperty.set( springConstant );
    } );
    this.parallelSystem.bottomSpring.springConstantProperty.link( function( springConstant ) {
      thisModel.seriesSystem.rightSpring.springConstantProperty.set( springConstant );
    } );
  }

  return inherit( Object, SystemsModel, {

    reset: function() {
      this.seriesSystem.reset();
      this.parallelSystem.reset();
    }
  } );
} );