// Copyright 2015-2024, University of Colorado Boulder

/**
 * IntroVisibilityPanel contains controls for the visibility of various representations in the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import EquilibriumPositionCheckbox from '../../common/view/EquilibriumPositionCheckbox.js';
import ValuesCheckbox from '../../common/view/ValuesCheckbox.js';
import VectorCheckbox from '../../common/view/VectorCheckbox.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import IntroViewProperties from './IntroViewProperties.js';

const Y_SPACING = 20;

type SelfOptions = EmptySelfOptions;

type IntroVisibilityPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class IntroVisibilityPanel extends Panel {

  public constructor( properties: IntroViewProperties, providedOptions: IntroVisibilityPanelOptions ) {

    const options = optionize3<IntroVisibilityPanelOptions, SelfOptions, PanelOptions>()(
      {}, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, providedOptions );

    const appliedForceCheckbox = new VectorCheckbox( properties.appliedForceVectorVisibleProperty, HookesLawStrings.appliedForceStringProperty, {
      vectorType: 'force',
      arrowFill: HookesLawColors.appliedForceColorProperty,
      tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
    } );

    const springForceCheckbox = new VectorCheckbox( properties.springForceVectorVisibleProperty, HookesLawStrings.springForceStringProperty, {
      vectorType: 'force',
      arrowFill: HookesLawColors.singleSpringMiddleColorProperty,
      tandem: options.tandem.createTandem( 'springForceCheckbox' )
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
      children: checkboxes,
      align: 'left',
      spacing: Y_SPACING,
      minContentWidth: 150
    } );

    super( content, options );
  }
}

hookesLaw.register( 'IntroVisibilityPanel', IntroVisibilityPanel );