// Copyright 2002-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

// modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MVSpringNode = require( 'HOOKES_LAW/experimental/MVSpringNode' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {ExperimentalModel} model
   * @constructor
   */
  function ExperimentalView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    this.addChild( new MVSpringNode( {
      left: 20,
      centerY: this.layoutBounds.centerY
    }) );
  }

  return inherit( ScreenView, ExperimentalView );
} );
