//  Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppliedForceControlPanel = require( 'HOOKES_LAW/common/view/AppliedForceControlPanel' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VisibilityControlPanel = require( 'HOOKES_LAW/common/view/VisibilityControlPanel' );
  var ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  // strings
  var returnString = require( 'string!HOOKES_LAW/return' );

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new ViewProperties();

    // Visibility controls
    var visibilityControlPanel = new VisibilityControlPanel(
      viewProperties.appliedForceVectorVisibleProperty,
      viewProperties.springForceVectorVisibleProperty,
      viewProperties.displacementVectorVisibleProperty,
      viewProperties.equilibriumPositionVisibleProperty,
      viewProperties.valuesVisibleProperty, {
        top: this.layoutBounds.top + 10,
        right: this.layoutBounds.right - 10
      }
    );
    this.addChild( visibilityControlPanel );

    // Applied Force control for spring 1
    var appliedForceControl1 = new AppliedForceControlPanel( model.spring1.appliedForceProperty, HookesLawConstants.APPLIED_FORCE_RANGE, {
      bottom: this.layoutBounds.bottom - 20,
      left: this.layoutBounds.left + 20
    } );
    this.addChild( appliedForceControl1 );

    //TODO appliedForceControl1 for spring2

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    // Return button
    var returnButton = new RectangularPushButton( {
      content: new Text( returnString, { font: new HookesLawFont( 24 ) } ),
      baseColor: 'rgb( 230, 230, 230 )',
      right: resetAllButton.left - 30,
      centerY: resetAllButton.centerY,
      listener: function() {
        //TODO
      }
    } );
    this.addChild( returnButton );
  }

  return inherit( ScreenView, IntroductionView, {

    step: function( dt ) {
      //TODO
    }
  } );
} );