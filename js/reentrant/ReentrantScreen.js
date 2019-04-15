// Copyright 2018-2019, University of Colorado Boulder

/**
 * Reentrant screen demonstrates the relationship between reentrant Properties in hookes-law,
 * as described in the Reentrant Properties section of implementation-notes.md.
 * This is a non-production screen that was created to understand the nature of reentrant Properties in this sim.
 * See https://github.com/phetsims/phet-io/issues/1349.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Screen = require( 'JOIST/Screen' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var REENTRANT = true; // whether Properties are reentrant
  var SPRING_CONSTANT = 100; // k: spring constant
  var SPRING_EQUILIBRIUM_X = 1.5; // e: spring's equilibrium position
  var FONT = new PhetFont( 22 );

  /**
   * @constructor
   */
  function ReentrantScreen() {
    Screen.call( this,
      function() { return new ReentrantModel(); },
      function( model ) { return new ReentrantScreenView( model ); }, {
        name: 'Reentrant'
      } );
  }

  hookesLaw.register( 'ReentrantScreen', ReentrantScreen );
  inherit( Screen, ReentrantScreen );

  /**
   * @constructor
   */
  function ReentrantModel() {

    var self = this;

    // @public x: displacement of the spring from equilibrium
    // This corresponds to Spring displacementProperty.
    this.xProperty = new NumberProperty( 0, {
      range: new Range( -10, 10 ),
      reentrant: REENTRANT
    } );

    // @public F: applied force on the spring
    // This corresponds to Spring appliedForceProperty.
    this.fProperty = new NumberProperty( this.xProperty.get() * SPRING_CONSTANT, {
      range: new Range( this.xProperty.range.min * SPRING_CONSTANT, this.xProperty.range.max * SPRING_CONSTANT ),
      reentrant: REENTRANT
    } );

    // @public p: position of robotic arm's pincer
    // This corresponds to RoboticArm leftProperty.
    this.pProperty = new NumberProperty( SPRING_EQUILIBRIUM_X + this.xProperty.get(), {
      range: new Range( SPRING_EQUILIBRIUM_X + this.xProperty.range.min, SPRING_EQUILIBRIUM_X + this.xProperty.range.max ),
      reentrant: REENTRANT
    } );

    // logging
    this.xProperty.link( function( displacement ) { phet.log && phet.log( 'x=' + displacement ); } );
    this.fProperty.link( function( appliedForce ) { phet.log && phet.log( 'F=' + appliedForce ); } );
    this.pProperty.link( function( left ) { phet.log && phet.log( 'p=' + left ); } );

    this.xProperty.link( function( displacement ) {
      self.pProperty.set( SPRING_EQUILIBRIUM_X + displacement ); // p = e + x
      self.fProperty.set( SPRING_CONSTANT * displacement ); // F = kx
    } );

    this.fProperty.link( function( appliedForce ) {
      self.xProperty.set( appliedForce / SPRING_CONSTANT ); // x = F/k
    } );

    this.pProperty.link( function( left ) {
      self.xProperty.set( left - SPRING_EQUILIBRIUM_X ); // x = p - e
    } );
  }

  inherit( Object, ReentrantModel, {

    // @public
    reset: function() {
      this.xProperty.reset();
      this.fProperty.reset();
      this.pProperty.reset();
    }
  } );

  /**
   * @param {ReentrantModel} model
   * @constructor
   */
  function ReentrantScreenView( model ) {
    ScreenView.call( this );

    // x - control and related equations
    var xBox = new HBox( {
      align: 'center',
      spacing: 40,
      children: [
        createNumberControl( 'x:', model.xProperty, {
          numberDisplayOptions: { decimalPlaces: 3 },
          delta: 0.01
        } ),
        new VBox( {
          align: 'left',
          spacing: 20,
          children: [
            new RichText( 'x = F / ' + SPRING_CONSTANT, { font: FONT } ),
            new RichText( 'x = p - ' + SPRING_EQUILIBRIUM_X, { font: FONT } )
          ]
        } )
      ]
    } );

    // F - control and related equations
    var fBox = new HBox( {
      align: 'center',
      spacing: 40,
      children: [
        createNumberControl( 'F:', model.fProperty, {
          numberDisplayOptions: { decimalPlaces: 1 },
          delta: 1
        } ),
        new RichText( 'F = ' + SPRING_CONSTANT + ' * x', { font: FONT } )
      ]
    } );


    // p - control and related equations
    var pBox = new HBox( {
      align: 'center',
      spacing: 40,
      children: [
        createNumberControl( 'p:', model.pProperty, {
          numberDisplayOptions: { decimalPlaces: 3 },
          delta: 0.01
        } ),
        new RichText( 'p = ' + SPRING_EQUILIBRIUM_X + ' + x', { font: FONT } )
      ]
    } );

    this.addChild( new VBox( {
      spacing: 60,
      children: [ xBox, fBox, pBox ],
      center: this.layoutBounds.center
    } ) );

    // Reset All button
    this.addChild( new ResetAllButton( {
      listener: model.reset.bind( model ),
      right: this.layoutBounds.right - 20,
      bottom: this.layoutBounds.bottom - 20
    } ) );
  }

  inherit( ScreenView, ReentrantScreenView );

  /**
   * Creates a number control for a Property, with tick marks at min and max.
   * @param {string} label
   * @param {NumberProperty} property
   * @param {Object} [options]
   */
  function createNumberControl( label, property, options ) {
    assert && assert( property.range, 'missing range' );

    // construct nested options for NumberControl
    options = _.extend( {
      titleNodeOptions: { font: FONT },
      numberDisplayOptions: null,
      sliderOptions:{
        majorTicks: [
          { value: property.range.min, label: new RichText( property.range.min ) },
          { value: property.range.max, label: new RichText( property.range.max ) }
        ]
      }
    }, options );
    options.numberDisplayOptions = _.extend( { font: FONT }, options.numberDisplayOptions );

    return new NumberControl( label, property, property.range, options );
  }

  return ReentrantScreen;
} );