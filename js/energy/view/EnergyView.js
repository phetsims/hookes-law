// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  var EnergyVisibilityPanel = require( 'HOOKES_LAW/energy/view/EnergyVisibilityPanel' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SingleSpringSystemNode = require( 'HOOKES_LAW/introduction/view/SingleSpringSystemNode' );

  /**
   * @param {EnergyModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function EnergyView( model, modelViewTransform ) {

    var thisView = this;
    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new EnergyViewProperties();

    // Visibility controls
    var visibilityPanel = new EnergyVisibilityPanel( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // System 1
    var systemNode = new SingleSpringSystemNode( model.system, modelViewTransform, viewProperties, {
      number: 1,
      left: this.layoutBounds.left + 49, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      top: this.layoutBounds.centerY + 10
    } );
    this.addChild( systemNode );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );
  }

  return inherit( ScreenView, EnergyView );
} );