// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Systems" view.
 * This control panel is a bit similar to IntroductionVisibilityPanel, but it
 * provides 2 choices ('total' and 'components') for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BracketNode = require( 'SCENERY_PHET/BracketNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var HStrut = require( 'SUN/HStrut' );
  var IconFactory = require( 'HOOKES_LAW/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var springForceString = require( 'string!HOOKES_LAW/springForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var valuesString = require( 'string!HOOKES_LAW/values' );
  var totalString = require( 'string!HOOKES_LAW/total' );
  var componentsSpring = require( 'string!HOOKES_LAW/components' );

  // constants
  var CHECK_BOX_OPTIONS = { spacing: 8 };
  var RADIO_BUTTON_OPTIONS = { radius: 12 };
  var TEXT_OPTIONS = { font: new HookesLawFont( 18 ) };

  /**
   * @param {SystemsVisibilityProperties} visibilityProperties
   * @param {Object} [options]
   * @constructor
   */
  function SystemsVisibilityPanel( visibilityProperties, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15
    }, options );

    // text labels on the vector check boxes
    var appliedForceTextNode = new Text( appliedForceString, TEXT_OPTIONS );
    var springForceTextNode = new Text( springForceString, TEXT_OPTIONS );
    var displacementTextNode = new Text( displacementString, TEXT_OPTIONS );
    var maxTextWidth = _.max( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], function( node ) {
      return node.width;
    } ).width;

    // vector check boxes, with left-aligned vector icons
    var appliedForceCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( appliedForceTextNode, maxTextWidth, HookesLawColors.APPLIED_FORCE_VECTOR ),
      visibilityProperties.appliedForceVectorVisibleProperty,
      CHECK_BOX_OPTIONS );
    var springForceCheckBox = new CheckBox(
      springForceTextNode,
      visibilityProperties.springForceVectorVisibleProperty,
      CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( displacementTextNode, maxTextWidth, HookesLawColors.DISPLACEMENT_VECTOR, { arrowType: 'line' } ),
      visibilityProperties.displacementVectorVisibleProperty,
      CHECK_BOX_OPTIONS );

    // other check boxes
    var equilibriumPositionCheckBox = new CheckBox(
      IconFactory.createEquilibriumPositionCheckBoxContent(),
      visibilityProperties.equilibriumPositionVisibleProperty,
      CHECK_BOX_OPTIONS );
    var valuesCheckBox = new CheckBox(
      new Text( valuesString, TEXT_OPTIONS ),
      visibilityProperties.valuesVisibleProperty,
      CHECK_BOX_OPTIONS );

    // 'total' control
    var totalRadioButton = new AquaRadioButton( visibilityProperties.springForceRepresentationProperty, 'total',
      new Text( totalString, TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var totalIcon = IconFactory.createForceVectorIcon( HookesLawColors.SPRING_FORCE_VECTOR );
    var totalControl = new HBox( {
      children: [ totalRadioButton, totalIcon ],
      spacing: 10
    } );

    // 'components' control
    var componentsRadioButton = new AquaRadioButton( visibilityProperties.springForceRepresentationProperty, 'component',
      new Text( componentsSpring, TEXT_OPTIONS ), RADIO_BUTTON_OPTIONS );
    var componentsVectorIcons = new VBox( {
      children: [
        IconFactory.createForceVectorIcon( HookesLawColors.TOP_SPRING_FORCE_VECTOR ),
        IconFactory.createForceVectorIcon( HookesLawColors.BOTTOM_SPRING_FORCE_VECTOR )
      ],
      spacing: 10
    } );
    var componentsBracket = new BracketNode( {
      orientation: 'left',
      bracketLength: componentsVectorIcons.height
    } );
    var componentsControl = new HBox( {
      children: [ componentsRadioButton, componentsBracket, componentsVectorIcons ],
      spacing: 10
    } );

    var radioButtonsBox = new VBox( {
      children: [
        totalControl,
        componentsControl
      ],
      align: 'left',
      spacing: 10
    } );

    var radioButtonsSubPanel = new HBox( {
      children: [ new HStrut( 25 ), radioButtonsBox ],
      spacing: 5
    } );

    // 'Values' check box pertains to vectors, so enable that check box only if one or more of the vectors is selected.
    Property.multilink(
      [ visibilityProperties.appliedForceVectorVisibleProperty, visibilityProperties.springForceVectorVisibleProperty, visibilityProperties.displacementVectorVisibleProperty ],
      function( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) {
        valuesCheckBox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Radio buttons should be enabled only if 'spring force' is checked
    visibilityProperties.springForceVectorVisibleProperty.link( function( springForceVectorVisible ) {
      totalRadioButton.enabled = componentsRadioButton.enabled = springForceVectorVisible;
      totalIcon.opacity = componentsVectorIcons.opacity = componentsBracket.opacity = ( springForceVectorVisible ? 1 : 0.3 );
    } );

    // Adjust touch areas
    var spacing = 20;
    var controls = [
      appliedForceCheckBox,
      springForceCheckBox,
      displacementCheckBox,
      equilibriumPositionCheckBox,
      valuesCheckBox,
      totalRadioButton,
      componentsRadioButton
    ];
    for ( var i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: [
        appliedForceCheckBox,
        springForceCheckBox,
        radioButtonsSubPanel,
        displacementCheckBox,
        equilibriumPositionCheckBox,
        valuesCheckBox
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SystemsVisibilityPanel );
} );
