// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExperimentalControls = require( 'HOOKES_LAW/experimental/view/ExperimentalControls' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParametricSpringNode = require( 'HOOKES_LAW/experimental/view/ParametricSpringNode' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {ExperimentalModel} model
   * @constructor
   */
  function ExperimentalView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // control panel
    this.addChild( new ExperimentalControls( model, {
      left: 20,
      top: 20,
      scale: 0.75
    } ) );

    // spring with 1 path
    this.addChild( new ParametricSpringNode( model, {
      left: 50,
      top: 300
    } ) );

    // spring with separate paths for front and back
    this.addChild( new ParametricSpringNode( model, {
      paths: 2,
      frontStroke: 'lightBlue',
      backStroke: 'blue',
      left: 50,
      top: 450
    } ) );
  }

  return inherit( ScreenView, ExperimentalView );
} );
