// Copyright 2015-2022, University of Colorado Boulder

/**
 * SystemsVisibilityPanel contains controls for the visibility of various representations in the "Systems" screen.
 * This panel is a bit similar to IntroVisibilityPanel, but it provides choices for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import { AlignGroup, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import EquilibriumPositionCheckbox from '../../common/view/EquilibriumPositionCheckbox.js';
import ValuesCheckbox from '../../common/view/ValuesCheckbox.js';
import VectorCheckbox from '../../common/view/VectorCheckbox.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import SpringForceRadioButtonGroup from './SpringForceRadioButtonGroup.js';

export default class SystemsVisibilityPanel extends Panel {

  /**
   * @param {SystemsViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // So that text labels on the vector checkboxes all have the same effective size
    const textAlignBoxOptions = {
      group: new AlignGroup(),
      xAlign: 'left'
    };

    const appliedForceCheckbox = new VectorCheckbox( properties.appliedForceVectorVisibleProperty,
      HookesLawStrings.appliedForceStringProperty, {
        vectorType: 'force',
        arrowFill: HookesLawColors.APPLIED_FORCE,
        textAlignBoxOptions: textAlignBoxOptions,
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      } );

    const springForceCheckbox = new VectorCheckbox( properties.springForceVectorVisibleProperty, HookesLawStrings.springForceStringProperty, {
      vectorType: 'force',
      arrowFill: HookesLawColors.SINGLE_SPRING,
      textAlignBoxOptions: textAlignBoxOptions,
      tandem: options.tandem.createTandem( 'springForceCheckbox' )
    } );

    const springForceRadioButtonGroup = new SpringForceRadioButtonGroup(
      properties.springForceRepresentationProperty, properties.systemTypeProperty, {
        layoutOptions: {
          leftMargin: 25
        },
        tandem: options.tandem.createTandem( 'springForceRadioButtonGroup' )
      } );

    const displacementCheckbox = new VectorCheckbox( properties.displacementVectorVisibleProperty, HookesLawStrings.displacementStringProperty, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.DISPLACEMENT,
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

    // Radio buttons should be enabled only if 'spring force' is checked
    properties.springForceVectorVisibleProperty.link( springForceVectorVisible => {
      springForceRadioButtonGroup.enabled = springForceVectorVisible;
    } );

    // Adjust touch areas
    const spacing = 20;
    const controls = [
      appliedForceCheckbox,
      springForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( let i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
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
      spacing: spacing
    } );

    super( content, options );
  }
}

hookesLaw.register( 'SystemsVisibilityPanel', SystemsVisibilityPanel );