// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyVisibilityPanel contains controls for the visibility of various representations in the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HSeparator, NodeTranslationOptions, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import EquilibriumPositionCheckbox from '../../common/view/EquilibriumPositionCheckbox.js';
import ValuesCheckbox from '../../common/view/ValuesCheckbox.js';
import VectorCheckbox from '../../common/view/VectorCheckbox.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import EnergyCheckbox from './EnergyCheckbox.js';
import EnergyGraph from './EnergyGraph.js';
import EnergyGraphRadioButtonGroup from './EnergyGraphRadioButtonGroup.js';
import EnergyViewProperties from './EnergyViewProperties.js';

// constants
const Y_SPACING = 20;

type SelfOptions = EmptySelfOptions;

type EnergyVisibilityPanelOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<PanelOptions, 'maxWidth'> &
  PickRequired<PanelOptions, 'tandem'>;

export default class EnergyVisibilityPanel extends Panel {

  public constructor( properties: EnergyViewProperties, providedOptions: EnergyVisibilityPanelOptions ) {

    const options = optionize3<EnergyVisibilityPanelOptions, SelfOptions, PanelOptions>()(
      {}, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, providedOptions );

    const energyGraphRadioButtonGroup = new EnergyGraphRadioButtonGroup( properties.graphProperty, {
      spacing: Y_SPACING,
      tandem: options.tandem.createTandem( 'energyGraphRadioButtonGroup' )
    } );

    const energyCheckbox = new EnergyCheckbox( properties.energyOnForcePlotVisibleProperty, {
      enabledProperty: new DerivedProperty( [ properties.graphProperty ], graph => ( graph === EnergyGraph.FORCE_PLOT ) ),
      tandem: options.tandem.createTandem( 'energyCheckbox' )
    } );

    const energyCheckboxWrapper = new VBox( {
      children: [ energyCheckbox ],
      layoutOptions: { leftMargin: 25 }, // indented from check boxes
      visibleProperty: energyGraphRadioButtonGroup.getButton( EnergyGraph.FORCE_PLOT ).visibleProperty
    } );

    const appliedForceCheckbox = new VectorCheckbox( properties.appliedForceVectorVisibleProperty,
      HookesLawStrings.appliedForceStringProperty, {
        vectorType: 'force',
        arrowFill: HookesLawColors.APPLIED_FORCE,
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      } );

    const displacementCheckbox = new VectorCheckbox( properties.displacementVectorVisibleProperty, HookesLawStrings.displacementStringProperty, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.DISPLACEMENT,
      tandem: options.tandem.createTandem( 'displacementCheckbox' )
    } );

    const equilibriumPositionCheckbox = new EquilibriumPositionCheckbox( properties.equilibriumPositionVisibleProperty,
      options.tandem.createTandem( 'equilibriumPositionCheckbox' ) );

    const valuesCheckbox = new ValuesCheckbox( properties.valuesVisibleProperty, options.tandem.createTandem( 'valuesCheckbox' ) );

    // Adjust touch areas
    const controls = [
      energyGraphRadioButtonGroup,
      energyCheckbox,
      appliedForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( let i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( Y_SPACING / 2 ) - 1 );
    }

    const content = new VBox( {
      children: [
        energyGraphRadioButtonGroup,
        energyCheckboxWrapper,
        new HSeparator( HookesLawConstants.HSEPARATOR_OPTIONS ),
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