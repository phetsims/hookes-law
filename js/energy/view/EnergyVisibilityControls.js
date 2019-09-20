// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Energy" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AquaRadioButton = require( 'SUN/AquaRadioButton' );
  const Checkbox = require( 'SUN/Checkbox' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  const HSeparator = require( 'SUN/HSeparator' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Panel = require( 'SUN/Panel' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  const barGraphString = require( 'string!HOOKES_LAW/barGraph' );
  const displacementString = require( 'string!HOOKES_LAW/displacement' );
  const energyPlotString = require( 'string!HOOKES_LAW/energyPlot' );
  const energyString = require( 'string!HOOKES_LAW/energy' );
  const forcePlotString = require( 'string!HOOKES_LAW/forcePlot' );
  const valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function EnergyVisibilityControls( properties, options ) {

    options = _.extend( {
      tandem: Tandem.required
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // radio buttons
    const barGraphRadioButton = new AquaRadioButton( properties.graphProperty, 'barGraph',
      new Text( barGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      _.extend( {
        tandem: options.tandem.createTandem( 'barGraphRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    const energyPlotRadioButton = new AquaRadioButton( properties.graphProperty, 'energyPlot',
      new Text( energyPlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      _.extend( {
        tandem: options.tandem.createTandem( 'energyPlotRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    const forcePlotRadioButton = new AquaRadioButton( properties.graphProperty, 'forcePlot',
      new Text( forcePlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      _.extend( {
        tandem: options.tandem.createTandem( 'forcePlotRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    // energy checkbox, enabled when "Force Plot" radio button is selected
    const energyIcon = new HBox( {
      children: [
        new Text( energyString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        // triangle
        new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), { fill: HookesLawColors.ENERGY } )
      ],
      spacing: 6
    } );
    const energyCheckbox = new Checkbox( energyIcon,
      properties.energyOnForcePlotVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'energyCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );
    properties.graphProperty.link( function( graph ) {
      energyCheckbox.enabled = ( graph === 'forcePlot' );
    } );

    // other checkboxes
    const appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.APPLIED_FORCE
      } ),
      properties.appliedForceVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        vectorType: 'displacement'
      } ),
      properties.displacementVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    const equilibriumPositionCheckbox = new Checkbox(
      HookesLawIconFactory.createEquilibriumPositionCheckboxContent(),
      properties.equilibriumPositionVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    const valuesCheckbox = new Checkbox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'valuesCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    // Adjust touch areas
    const spacing = 20;
    const controls = [
      barGraphRadioButton,
      energyPlotRadioButton,
      forcePlotRadioButton,
      energyCheckbox,
      appliedForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( let i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    const maxControlWidth = _.maxBy( controls, function( node ) { return node.width; } ).width;

    const content = new VBox( {
      children: [
        barGraphRadioButton,
        energyPlotRadioButton,
        forcePlotRadioButton,
        // "Energy" checkbox indented below "Force Plot" radio button
        new HBox( { children: [ new HStrut( 25 ), energyCheckbox ] } ),
        new HSeparator( maxControlWidth, _.extend( {}, HookesLawConstants.SEPARATOR_OPTIONS, {
          tandem: options.tandem.createTandem( 'separator' )
        } ) ),
        appliedForceCheckbox,
        displacementCheckbox,
        equilibriumPositionCheckbox,
        valuesCheckbox
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  hookesLaw.register( 'EnergyVisibilityControls', EnergyVisibilityControls );

  return inherit( Panel, EnergyVisibilityControls );
} );
