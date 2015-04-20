// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberOfSystemsControl = require( 'HOOKES_LAW/common/view/NumberOfSystemsControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpringControlPanel = require( 'HOOKES_LAW/common/view/SpringControlPanel' );
  var SystemNode = require( 'HOOKES_LAW/common/view/SystemNode' );
  var VisibilityPanel = require( 'HOOKES_LAW/common/view/VisibilityPanel' );
  var VisibilityProperties = require( 'HOOKES_LAW/common/view/VisibilityProperties' );

  /**
   * @param {IntroductionModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function IntroductionView( model, modelViewTransform ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the visibility of things in the view
    var visibilityProperties = new VisibilityProperties();

    // System 1
    var system1 = new SystemNode( model.spring1, modelViewTransform, visibilityProperties, {
      left: this.layoutBounds.left + 20,
      top: this.layoutBounds.top + 15
    } );

    // Controls for spring 1
    var springControlPanel1 = new SpringControlPanel( model.spring1, {
      left: system1.left,
      top: system1.bottom + 10
    } );

    // System 2
    var system2 = new SystemNode( model.spring2, modelViewTransform, visibilityProperties, {
      left: system1.left,
      top: springControlPanel1.bottom + 15
    } );

    // Controls for spring 2
    var springControlPanel2 = new SpringControlPanel( model.spring2, {
      left: springControlPanel1.left,
      top: system2.bottom + 10
    } );

    var systemsParent = new Node( {
      left: 10,
      centerY: this.layoutBounds.centerY,
      children: [
        system1,
        springControlPanel1,
        system2,
        springControlPanel2
      ]
    } );
    this.addChild( systemsParent );

    // Visibility controls
    var visibilityPanel = new VisibilityPanel( visibilityProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // Control for number of systems
    var numberOfSystemsControl = new NumberOfSystemsControl( model.numberOfSystemsProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( numberOfSystemsControl );

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        visibilityProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );

    model.numberOfSystemsProperty.link( function( numberOfSystems ) {

      assert && assert( numberOfSystems === 1 || numberOfSystems === 2 );

      //TODO adjust titles for system 1

      // hide system 2
      system2.visible = springControlPanel2.visible = ( numberOfSystems === 2 );
    } );
  }

  return inherit( ScreenView, IntroductionView );
} );