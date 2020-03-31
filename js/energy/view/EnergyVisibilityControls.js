// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Energy" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Shape from '../../../../kite/js/Shape.js';
import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLawStrings from '../../hookesLawStrings.js';
import hookesLaw from '../../hookesLaw.js';

// strings
const appliedForceString = hookesLawStrings.appliedForce;
const barGraphString = hookesLawStrings.barGraph;
const displacementString = hookesLawStrings.displacement;
const energyPlotString = hookesLawStrings.energyPlot;
const energyString = hookesLawStrings.energy;
const forcePlotString = hookesLawStrings.forcePlot;
const valuesString = hookesLawStrings.values;

class EnergyVisibilityControls extends Panel {

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // radio buttons
    const barGraphRadioButton = new AquaRadioButton( properties.graphProperty, 'barGraph',
      new Text( barGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      merge( {
        tandem: options.tandem.createTandem( 'barGraphRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    const energyPlotRadioButton = new AquaRadioButton( properties.graphProperty, 'energyPlot',
      new Text( energyPlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      merge( {
        tandem: options.tandem.createTandem( 'energyPlotRadioButton' )
      }, HookesLawConstants.RADIO_BUTTON_OPTIONS ) );

    const forcePlotRadioButton = new AquaRadioButton( properties.graphProperty, 'forcePlot',
      new Text( forcePlotString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      merge( {
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
      merge( {
        tandem: options.tandem.createTandem( 'energyCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );
    properties.graphProperty.link( graph => {
      energyCheckbox.enabled = ( graph === 'forcePlot' );
    } );

    // other checkboxes
    const appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.APPLIED_FORCE
      } ),
      properties.appliedForceVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        vectorType: 'displacement'
      } ),
      properties.displacementVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const equilibriumPositionCheckbox = new Checkbox(
      HookesLawIconFactory.createEquilibriumPositionCheckboxContent(),
      properties.equilibriumPositionVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const valuesCheckbox = new Checkbox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'valuesCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

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

    const maxControlWidth = _.maxBy( controls, node => node.width ).width;

    const content = new VBox( {
      children: [
        barGraphRadioButton,
        energyPlotRadioButton,
        forcePlotRadioButton,
        // "Energy" checkbox indented below "Force Plot" radio button
        new HBox( { children: [ new HStrut( 25 ), energyCheckbox ] } ),
        new HSeparator( maxControlWidth, merge( {}, HookesLawConstants.SEPARATOR_OPTIONS, {
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

    super( content, options );
  }
}

hookesLaw.register( 'EnergyVisibilityControls', EnergyVisibilityControls );

export default EnergyVisibilityControls;