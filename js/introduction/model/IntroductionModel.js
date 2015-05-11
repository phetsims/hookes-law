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
      x: 0,
      equilibriumX: 1.5
    } );
    this.roboticArm1 = new RoboticArm( {
      x: 3,
      hookX: this.spring1.equilibriumX + this.spring1.displacementProperty.get()
    } );

    this.roboticArm1.hookXProperty.link( function( hookX ) {
      thisModel.spring1.displacementProperty.set( hookX - thisModel.spring1.equilibriumX );
    } );
    this.spring1.displacementProperty.link( function( displacement ) {
      thisModel.roboticArm1.hookXProperty.set( thisModel.spring1.equilibriumX + displacement );
    } );

    //TODO lots of duplication with system 1 above
    // system 2
    this.spring2 = new Spring( {
      x: this.spring1.x,
      equilibriumX: this.spring1.equilibriumX
    } );
    this.roboticArm2 = new RoboticArm( {
      x: this.roboticArm1.x,
      hookX: this.spring2.equilibriumX + this.spring2.displacementProperty.get()
    } );

    this.roboticArm2.hookXProperty.link( function( hookX ) {
      thisModel.spring2.displacementProperty.set( hookX - thisModel.spring2.equilibriumX );
    } );
    this.spring2.displacementProperty.link( function( displacement ) {
      thisModel.roboticArm2.hookXProperty.set( thisModel.spring2.equilibriumX + displacement );
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