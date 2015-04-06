//  Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppliedForcePanel = require( 'HOOKES_LAW/common/view/AppliedForcePanel' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberOfSystemsControl = require( 'HOOKES_LAW/common/view/NumberOfSystemsControl' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpringConstantPanel = require( 'HOOKES_LAW/common/view/SpringConstantPanel' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VisibilityPanel = require( 'HOOKES_LAW/common/view/VisibilityPanel' );
  var ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  // strings
  var appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  var returnString = require( 'string!HOOKES_LAW/return' );
  var springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

  /**
   * @param {IntroductionModel} model
   * @constructor
   */
  function IntroductionView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new ViewProperties();

    // Visibility controls
    var visibilityPanel = new VisibilityPanel(
      viewProperties.appliedForceVectorVisibleProperty,
      viewProperties.springForceVectorVisibleProperty,
      viewProperties.displacementVectorVisibleProperty,
      viewProperties.equilibriumPositionVisibleProperty,
      viewProperties.valuesVisibleProperty, {
        top: this.layoutBounds.top + 10,
        right: this.layoutBounds.right - 10
      }
    );
    this.addChild( visibilityPanel );

    // Spring constant control for spring 1
    var springConstantPanel1 = new SpringConstantPanel( model.spring1.springConstantProperty, HookesLawConstants.SPRING_CONSTANT_RANGE, {
      title: StringUtils.format( springConstantNumberString, 1 ),
      right: visibilityPanel.right,
      top: visibilityPanel.bottom + 20
    } );
    this.addChild( springConstantPanel1 );

    // Spring constant control for spring 2
    var springConstantPanel2 = new SpringConstantPanel( model.spring2.springConstantProperty, HookesLawConstants.SPRING_CONSTANT_RANGE, {
      title: StringUtils.format( springConstantNumberString, 2 ),
      right: springConstantPanel1.right,
      top: springConstantPanel1.bottom + 20
    } );
    this.addChild( springConstantPanel2 );

    // Applied Force control for spring 1
    var appliedForcePanel1 = new AppliedForcePanel( model.spring1.appliedForceProperty, HookesLawConstants.APPLIED_FORCE_RANGE, {
      title: StringUtils.format( appliedForceNumberString, 1 ),
      top: this.layoutBounds.top + 20,
      left: this.layoutBounds.left + 20

    } );
    this.addChild( appliedForcePanel1 );

    // Applied Force control for spring 2
    var appliedForcePanel2 = new AppliedForcePanel( model.spring2.appliedForceProperty, HookesLawConstants.APPLIED_FORCE_RANGE, {
      title: StringUtils.format( appliedForceNumberString, 2 ),
      top: appliedForcePanel1.bottom + 20,
      left: appliedForcePanel1.left
    } );
    this.addChild( appliedForcePanel2 );

    // Number of systems
    var numberOfSystemsControl = new NumberOfSystemsControl( model.numberOfSystemsProperty, {
      right: visibilityPanel.right,
      top: springConstantPanel2.bottom + 10
    } );
    this.addChild( numberOfSystemsControl );

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