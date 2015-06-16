// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FrontBackSpringNode = require( 'HOOKES_LAW/experimental/FrontBackSpringNode' );
  var ExperimentalControls = require( 'HOOKES_LAW/experimental/ExperimentalControls' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MVSpringNode = require( 'HOOKES_LAW/experimental/MVSpringNode' );
  var ParametricSpringNode = require( 'HOOKES_LAW/experimental/ParametricSpringNode' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {ExperimentalModel} model
   * @constructor
   */
  function ExperimentalView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    this.addChild( new ExperimentalControls( model, {
      left: 20,
      top: 20
    } ) );

    this.addChild( new ParametricSpringNode( model, {
      left: 50,
      top: 300
    } ) );

    this.addChild( new FrontBackSpringNode( model, {
      left: 50,
      top: 450
    } ) );
  }

  return inherit( ScreenView, ExperimentalView );
} );
