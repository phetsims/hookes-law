// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Systems" view.
 * This control panel is a bit similar to IntroVisibilityPanel, but it provides 2 choices
 * ('total' and 'components') for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BracketNode = require( 'SCENERY_PHET/BracketNode' );
  var Checkbox = require( 'SUN/Checkbox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var componentsString = require( 'string!HOOKES_LAW/components' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var springForceString = require( 'string!HOOKES_LAW/springForce' );
  var totalString = require( 'string!HOOKES_LAW/total' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {SystemsViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function SystemsVisibilityControls( properties, options ) {

    options = _.extend( {
      tandem: Tandem.required
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // vector checkboxes
    var appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        { arrowFill: HookesLawColors.APPLIED_FORCE } ),
      properties.appliedForceVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var springForceCheckbox = new Checkbox(
      new Text( springForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.springForceVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        vectorType: 'displacement'
      } ),
      properties.displacementVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    // other checkboxes
    var equilibriumPositionCheckbox = new Checkbox(
      HookesLawIconFactory.createEquilibriumPositionCheckboxContent(),
      properties.equilibriumPositionVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var valuesCheckbox = new Checkbox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'valuesCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    // 'total' radio button
    var totalRadioButton = new AquaRadioButton( properties.springForceRepresentationProperty, 'total',
      new HBox( {
        children: [
          new Text( totalString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
          HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.SINGLE_SPRING } )
        ],
        spacing: 10
      } ),
      _.extend( {
        tandem: options.tandem.createTandem( 'totalRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    // 'components' radio button
    var component1Node = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.TOP_SPRING } );
    var component2Node = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.BOTTOM_SPRING } );
    var componentsVectorIcons = new VBox( {
      children: [
        component1Node,
        component2Node
      ],
      spacing: 10
    } );
    var componentsRadioButton = new AquaRadioButton( properties.springForceRepresentationProperty, 'components',
      new HBox( {
        children: [
          new Text( componentsString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
          new BracketNode( {
            orientation: 'left',
            bracketLength: componentsVectorIcons.height
          } ),
          componentsVectorIcons
        ],
        spacing: 10
      } ),
      _.extend( {
        tandem: options.tandem.createTandem( 'componentsRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    // Change the component vector colors to match the system
    properties.seriesParallelProperty.link( function( seriesParallel ) {
      component1Node.fill = ( seriesParallel === 'series' ) ? HookesLawColors.LEFT_SPRING : HookesLawColors.TOP_SPRING;
      component2Node.fill = ( seriesParallel === 'series' ) ? HookesLawColors.RIGHT_SPRING : HookesLawColors.BOTTOM_SPRING;
    } );

    var radioButtonsBox = new VBox( {
      children: [
        totalRadioButton,
        componentsRadioButton
      ],
      align: 'left',
      spacing: 10
    } );

    var radioButtonsSubPanel = new HBox( {
      children: [ new HStrut( 25 ), radioButtonsBox ],
      spacing: 5
    } );

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Property.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      function( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) {
        valuesCheckbox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Radio buttons should be enabled only if 'spring force' is checked
    properties.springForceVectorVisibleProperty.link( function( springForceVectorVisible ) {
      totalRadioButton.enabled = componentsRadioButton.enabled = springForceVectorVisible;
    } );

    // Adjust touch areas
    var spacing = 20;
    var controls = [
      appliedForceCheckbox,
      springForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox,
      totalRadioButton,
      componentsRadioButton
    ];
    for ( var i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: [
        appliedForceCheckbox,
        springForceCheckbox,
        radioButtonsSubPanel,
        displacementCheckbox,
        equilibriumPositionCheckbox,
        valuesCheckbox
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  hookesLaw.register( 'SystemsVisibilityControls', SystemsVisibilityControls );

  return inherit( Panel, SystemsVisibilityControls );
} );
