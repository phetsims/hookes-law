// Copyright 2015-2024, University of Colorado Boulder

/**
 * SystemsVisibilityPanel contains controls for the visibility of various representations in the "Systems" screen.
 * This panel is a bit similar to IntroVisibilityPanel, but it provides choices for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { AlignBoxOptions, AlignGroup, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import EquilibriumPositionCheckbox from '../../common/view/EquilibriumPositionCheckbox.js';
import ValuesCheckbox from '../../common/view/ValuesCheckbox.js';
import VectorCheckbox from '../../common/view/VectorCheckbox.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import SpringForceRadioButtonGroup from './SpringForceRadioButtonGroup.js';
import SystemsViewProperties from './SystemsViewProperties.js';

const Y_SPACING = 20;

type SelfOptions = EmptySelfOptions;

type SystemsVisibilityPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class SystemsVisibilityPanel extends Panel {

  public constructor( properties: SystemsViewProperties, providedOptions: SystemsVisibilityPanelOptions ) {

    const options = optionize3<SystemsVisibilityPanelOptions, SelfOptions, PanelOptions>()(
      {}, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, providedOptions );

    // So that text labels on the vector checkboxes all have the same effective size
    const textAlignBoxOptions: AlignBoxOptions = {
      group: new AlignGroup(),
      xAlign: 'left'
    };

    const appliedForceCheckbox = new VectorCheckbox( properties.appliedForceVectorVisibleProperty,
      HookesLawStrings.appliedForceStringProperty, {
        vectorType: 'force',
        arrowFill: HookesLawColors.appliedForceColorProperty,
        textAlignBoxOptions: textAlignBoxOptions,
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      } );

    const springForceCheckbox = new VectorCheckbox( properties.springForceVectorVisibleProperty, HookesLawStrings.springForceStringProperty, {
      vectorType: 'force',
      arrowFill: HookesLawColors.singleSpringMiddleColorProperty,
      textAlignBoxOptions: textAlignBoxOptions,
      tandem: options.tandem.createTandem( 'springForceCheckbox' )
    } );

    const springForceRadioButtonGroup = new SpringForceRadioButtonGroup(
      properties.springForceRepresentationProperty, properties.systemTypeProperty, {
        enabledProperty: properties.springForceVectorVisibleProperty, // enabled only if 'spring force' is checked
        tandem: options.tandem.createTandem( 'springForceRadioButtonGroup' )
      } );

    // If the springForceCheckbox is hidden, hide springForceRadioButtonGroup.
    const springForceRadioButtonGroupWrapper = new VBox( {
      children: [ springForceRadioButtonGroup ],
      layoutOptions: { leftMargin: 25 }, // indented from check boxes
      visibleProperty: springForceCheckbox.visibleProperty
    } );

    const displacementCheckbox = new VectorCheckbox( properties.displacementVectorVisibleProperty, HookesLawStrings.displacementStringProperty, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.displacementColorProperty,
      textAlignBoxOptions: textAlignBoxOptions,
      tandem: options.tandem.createTandem( 'displacementCheckbox' )
    } );

    const equilibriumPositionCheckbox = new EquilibriumPositionCheckbox( properties.equilibriumPositionVisibleProperty,
      options.tandem.createTandem( 'equilibriumPositionCheckbox' ) );

    const valuesCheckbox = new ValuesCheckbox( properties.valuesVisibleProperty, options.tandem.createTandem( 'valuesCheckbox' ) );

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Multilink.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      ( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) => {
        valuesCheckbox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    const checkboxes = [
      appliedForceCheckbox,
      springForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];

    // Adjust touch areas dynamically.
    for ( let i = 0; i < checkboxes.length; i++ ) {
      checkboxes[ i ].localBoundsProperty.link( localBounds => {
        checkboxes[ i ].touchArea = localBounds.dilatedXY( 10, ( Y_SPACING / 2 ) - 1 );
      } );
    }

    const content = new VBox( {
      children: [
        appliedForceCheckbox,
        springForceCheckbox,
        springForceRadioButtonGroupWrapper,
        displacementCheckbox,
        equilibriumPositionCheckbox,
        valuesCheckbox
      ],
      align: 'left',
      spacing: Y_SPACING,
      minContentWidth: 190
    } );

    super( content, options );
  }
}

hookesLaw.register( 'SystemsVisibilityPanel', SystemsVisibilityPanel );