// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function IntroductionModel() {

    var thisModel = this;

    PropertySet.call( this, {
      numberOfSystems: 1  // {number} 1 or 2
    } );

    // system 1
    this.spring1 = new Spring( {
      left: 0,
      equilibriumLength: 1.5
    } );
    this.roboticArm1 = new RoboticArm( {
      left: this.spring1.equilibriumXProperty.get() + this.spring1.displacementProperty.get(),
      right: 3
    } );

    this.roboticArm1.leftProperty.link( function( left ) {
      thisModel.spring1.displacementProperty.set( left - thisModel.spring1.equilibriumXProperty.get() );
    } );
    this.spring1.rightProperty.link( function( right ) {
      thisModel.roboticArm1.leftProperty.set( right );
    } );

    //TODO lots of duplication with system 1 above
    // system 2
    this.spring2 = new Spring( {
      left: this.spring1.left,
      equilibriumLength: this.spring1.equilibriumLength
    } );
    this.roboticArm2 = new RoboticArm( {
      left: this.spring2.equilibriumXProperty.get() + this.spring2.displacementProperty.get(),
      right: this.roboticArm1.right
    } );

    this.roboticArm2.leftProperty.link( function( left ) {
      thisModel.spring2.displacementProperty.set( left - thisModel.spring2.equilibriumXProperty.get() );
    } );
    this.spring2.rightProperty.link( function( right ) {
      thisModel.roboticArm2.leftProperty.set( right );
    } );
  }

  return inherit( PropertySet, IntroductionModel, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.spring1.reset();
      this.spring2.reset();
    }
  } );
} );