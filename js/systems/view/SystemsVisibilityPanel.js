// Copyright 2015-2022, University of Colorado Boulder

/**
 * SystemsVisibilityPanel contains controls for the visibility of various representations in the "Systems" screen.
 * This panel is a bit similar to IntroVisibilityPanel, but it provides choices for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, HStrut, Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
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

    // vector checkboxes
    const appliedForceCheckbox = new Checkbox( properties.appliedForceVectorVisibleProperty,
      HookesLawIconFactory.createVectorCheckboxContent( new Text( HookesLawStrings.appliedForceStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        vectorType: 'force',
        arrowFill: HookesLawColors.APPLIED_FORCE
      } ), merge( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceCheckbox = new Checkbox( properties.springForceVectorVisibleProperty,
      new Text( HookesLawStrings.springForceStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ), merge( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // Radio buttons for spring force
    const springForceRadioButtonGroup = new SpringForceRadioButtonGroup(
      properties.springForceRepresentationProperty, properties.systemTypeProperty,
      options.tandem.createTandem( 'springForceRadioButtonGroup' ) );
    const radioButtonsSubPanel = new HBox( {
      children: [ new HStrut( 25 ), springForceRadioButtonGroup ],
      spacing: 5
    } );

    const displacementCheckbox = new Checkbox( properties.displacementVectorVisibleProperty,
      HookesLawIconFactory.createVectorCheckboxContent( new Text( HookesLawStrings.displacementStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        vectorType: 'displacement',
        arrowFill: HookesLawColors.DISPLACEMENT
      } ), merge( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // other checkboxes
    const equilibriumPositionCheckboxTandem = options.tandem.createTandem( 'equilibriumPositionCheckbox' );
    const equilibriumPositionCheckbox = new Checkbox( properties.equilibriumPositionVisibleProperty,
      HookesLawIconFactory.createEquilibriumPositionCheckboxContent( equilibriumPositionCheckboxTandem ), merge( {
        tandem: equilibriumPositionCheckboxTandem
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const valuesCheckbox = new Checkbox( properties.valuesVisibleProperty,
      new Text( HookesLawStrings.valuesStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ), merge( {
        tandem: options.tandem.createTandem( 'valuesCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

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
        radioButtonsSubPanel,
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