// Copyright 2015-2024, University of Colorado Boulder

/**
 * SystemsVisibilityPanel contains controls for the visibility of various representations in the "Systems" screen.
 * This panel is a bit similar to IntroVisibilityPanel, but it provides choices for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { combineOptions, EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
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

    const appliedForceCheckbox = new VectorCheckbox( properties.appliedForceVectorVisibleProperty,
      HookesLawStrings.appliedForceStringProperty, {
        vectorType: 'force',
        arrowFill: HookesLawColors.appliedForceColorProperty,
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      } );

    const springForceCheckbox = new Checkbox( properties.springForceVectorVisibleProperty,
      new Text( HookesLawStrings.springForceStringProperty, {
        font: HookesLawConstants.CONTROL_TEXT_FONT,
        maxWidth: 110
      } ), combineOptions<CheckboxOptions>( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceRadioButtonGroup = new SpringForceRadioButtonGroup(
      properties.springForceRepresentationProperty, properties.systemTypeProperty, {
        visibleProperty: springForceCheckbox.visibleProperty, // If the springForceCheckbox is hidden, hide springForceRadioButtonGroup.
        layoutOptions: { leftMargin: 25 }, // indented from check boxes
        enabledProperty: properties.springForceVectorVisibleProperty, // enabled only if 'spring force' is checked
        tandem: options.tandem.createTandem( 'springForceRadioButtonGroup' )
      } );

    const displacementCheckbox = new VectorCheckbox( properties.displacementVectorVisibleProperty, HookesLawStrings.displacementStringProperty, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.displacementColorProperty,
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
        springForceRadioButtonGroup,
        displacementCheckbox,
        equilibriumPositionCheckbox,
        valuesCheckbox
      ],
      align: 'left',
      stretch: true,
      spacing: Y_SPACING,
      minContentWidth: 150
    } );

    super( content, options );
  }
}

hookesLaw.register( 'SystemsVisibilityPanel', SystemsVisibilityPanel );