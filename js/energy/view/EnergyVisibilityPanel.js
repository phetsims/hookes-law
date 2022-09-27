// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyVisibilityPanel contains controls for the visibility of various representations in the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, HStrut, Path, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSeparatorDeprecated from '../../../../sun/js/HSeparatorDeprecated.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import EnergyGraph from './EnergyGraph.js';

// constants
const Y_SPACING = 20;

class EnergyVisibilityPanel extends Panel {

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // radio buttons
    const radioButtonDescriptions = [
      {
        value: EnergyGraph.BAR_GRAPH,
        createNode: tandem => new Text( HookesLawStrings.barGraph, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'barGraphRadioButton'
      },
      {
        value: EnergyGraph.ENERGY_PLOT,
        createNode: tandem => new Text( HookesLawStrings.energyPlot, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'energyPlotRadioButton'
      },
      {
        value: EnergyGraph.FORCE_PLOT,
        createNode: tandem => new Text( HookesLawStrings.forcePlot, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'forcePlotRadioButton'
      }
    ];
    const plotRadioButtonGroup = new AquaRadioButtonGroup( properties.graphProperty, radioButtonDescriptions, {
      spacing: Y_SPACING,
      radioButtonOptions: HookesLawConstants.RADIO_BUTTON_OPTIONS,
      tandem: options.tandem.createTandem( 'plotRadioButtonGroup' )
    } );

    // energy checkbox, enabled when "Force Plot" radio button is selected
    const energyIcon = new HBox( {
      children: [
        new Text( HookesLawStrings.energy, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        // triangle
        new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), { fill: HookesLawColors.ENERGY } )
      ],
      spacing: 6
    } );
    const energyCheckbox = new Checkbox( properties.energyOnForcePlotVisibleProperty, energyIcon, merge( {
      tandem: options.tandem.createTandem( 'energyCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );
    properties.graphProperty.link( graph => {
      energyCheckbox.enabled = ( graph === EnergyGraph.FORCE_PLOT );
    } );

    // other checkboxes
    const appliedForceCheckbox = new Checkbox( properties.appliedForceVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( new Text( HookesLawStrings.appliedForce, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
      arrowFill: HookesLawColors.APPLIED_FORCE
    } ), merge( {
      tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox( properties.displacementVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( new Text( HookesLawStrings.displacement, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
      arrowFill: HookesLawColors.DISPLACEMENT,
      vectorType: 'displacement'
    } ), merge( {
      tandem: options.tandem.createTandem( 'displacementCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const equilibriumPositionCheckbox = new Checkbox( properties.equilibriumPositionVisibleProperty, HookesLawIconFactory.createEquilibriumPositionCheckboxContent(), merge( {
      tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const valuesCheckbox = new Checkbox( properties.valuesVisibleProperty, new Text( HookesLawStrings.values, HookesLawConstants.CONTROL_TEXT_OPTIONS ), merge( {
      tandem: options.tandem.createTandem( 'valuesCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // Adjust touch areas
    const controls = [
      plotRadioButtonGroup,
      energyCheckbox,
      appliedForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( let i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( Y_SPACING / 2 ) - 1 );
    }

    const maxControlWidth = _.maxBy( controls, node => node.width ).width;

    const content = new VBox( {
      children: [
        plotRadioButtonGroup,

        // "Energy" checkbox indented below plotRadioButtonGroup
        new HBox( { children: [ new HStrut( 25 ), energyCheckbox ] } ),
        new HSeparatorDeprecated( maxControlWidth, merge( {}, HookesLawConstants.SEPARATOR_OPTIONS, {
          tandem: options.tandem.createTandem( 'separator' )
        } ) ),
        appliedForceCheckbox,
        displacementCheckbox,
        equilibriumPositionCheckbox,
        valuesCheckbox
      ],
      align: 'left',
      spacing: Y_SPACING
    } );

    super( content, options );
  }
}

hookesLaw.register( 'EnergyVisibilityPanel', EnergyVisibilityPanel );

export default EnergyVisibilityPanel;