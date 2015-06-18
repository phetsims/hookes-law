// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Energy" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HSeparator = require( 'SUN/HSeparator' );
  var IconFactory = require( 'HOOKES_LAW/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var barGraphString = require( 'string!HOOKES_LAW/barGraph' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var energyPlotString = require( 'string!HOOKES_LAW/energyPlot' );
  var forcePlotString = require( 'string!HOOKES_LAW/forcePlot' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function EnergyVisibilityPanel( properties, options ) {

    options = _.extend( _.clone( HookesLawConstants.VISIBILITY_PANEL_OPTIONS ), options );

    // radio buttons
    var energyBarRadioButton = new AquaRadioButton( properties.graphProperty, 'energyBar',
      new Text( barGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );
    var energyXYRadioButton = new AquaRadioButton( properties.graphProperty, 'energyXY',
      new Text( energyPlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );
    var forceXYRadioButton = new AquaRadioButton( properties.graphProperty, 'forceXY',
      new Text( forcePlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );

    // check boxes
    var appliedForceCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.APPLIED_FORCE
      } ),
      properties.appliedForceVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        arrowType: 'line'
      } ),
      properties.displacementVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var equilibriumPositionCheckBox = new CheckBox(
      IconFactory.createEquilibriumPositionCheckBoxContent(),
      properties.equilibriumPositionVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var valuesCheckBox = new CheckBox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );

    // Adjust touch areas
    var spacing = 20;
    var controls = [
      energyBarRadioButton,
      energyXYRadioButton,
      forceXYRadioButton,
      appliedForceCheckBox,
      displacementCheckBox,
      equilibriumPositionCheckBox,
      valuesCheckBox
    ];
    for ( var i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var maxControlWidth = _.max( controls, function( node ) { return node.width; } ).width;

    var content = new VBox( {
      children: [
        energyBarRadioButton,
        energyXYRadioButton,
        forceXYRadioButton,
        new HSeparator( maxControlWidth, { stroke: HookesLawColors.CONTROL_PANEL_STROKE} ),
        appliedForceCheckBox,
        displacementCheckBox,
        equilibriumPositionCheckBox,
        valuesCheckBox
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, EnergyVisibilityPanel );
} );
