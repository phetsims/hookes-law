// Copyright 2015-2022, University of Colorado Boulder

/**
 * IntroVisibilityPanel contains controls for the visibility of various representations in the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import { AlignBox, AlignGroup, Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import EquilibriumPositionCheckbox from '../../common/view/EquilibriumPositionCheckbox.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

export default class IntroVisibilityPanel extends Panel {

  /**
   * @param {IntroViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    const appliedForceCheckboxTandem = options.tandem.createTandem( 'appliedForceCheckbox' );
    const springForceCheckboxTandem = options.tandem.createTandem( 'springForceCheckbox' );
    const displacementCheckboxTandem = options.tandem.createTandem( 'displacementCheckbox' );

    // text labels on the vector checkboxes, all with the same effective size
    const alignBoxOptions = {
      group: new AlignGroup(),
      xAlign: 'left'
    };
    const appliedForceText = new AlignBox( new Text( HookesLawStrings.appliedForceStringProperty,
        merge( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, { tandem: appliedForceCheckboxTandem.createTandem( 'text' ) } ) ),
      alignBoxOptions );
    const springForceText = new AlignBox( new Text( HookesLawStrings.springForceStringProperty,
        merge( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, { tandem: springForceCheckboxTandem.createTandem( 'text' ) } ) ),
      alignBoxOptions );
    const displacementText = new AlignBox( new Text( HookesLawStrings.displacementStringProperty,
        merge( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, { tandem: displacementCheckboxTandem.createTandem( 'text' ) } ) ),
      alignBoxOptions );

    // vector checkboxes, with left-aligned vector icons
    const appliedForceCheckbox = new Checkbox( properties.appliedForceVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( appliedForceText, {
      vectorType: 'force',
      arrowFill: HookesLawColors.APPLIED_FORCE
    } ), merge( {
      tandem: appliedForceCheckboxTandem
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceCheckbox = new Checkbox( properties.springForceVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( springForceText, {
      vectorType: 'force',
      arrowFill: HookesLawColors.SINGLE_SPRING
    } ), merge( {
      tandem: springForceCheckboxTandem
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox( properties.displacementVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( displacementText, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.DISPLACEMENT
    } ), merge( {
      tandem: options.tandem.createTandem( 'displacementCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // other checkboxes
    const equilibriumPositionCheckbox = new EquilibriumPositionCheckbox( properties.equilibriumPositionVisibleProperty,
      options.tandem.createTandem( 'equilibriumPositionCheckbox' ) );

    const valuesCheckboxTandem = options.tandem.createTandem( 'valuesCheckbox' );
    const valuesText = new Text( HookesLawStrings.valuesStringProperty, merge( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, {
      tandem: valuesCheckboxTandem.createTandem( 'text' )
    } ) );
    const valuesCheckbox = new Checkbox( properties.valuesVisibleProperty, valuesText, merge( {
      tandem: valuesCheckboxTandem
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Multilink.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      ( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) => {
        valuesCheckbox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Adjust touch areas
    const spacing = 20;
    const checkboxes = [
      appliedForceCheckbox,
      springForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( let i = 0; i < checkboxes.length; i++ ) {
      checkboxes[ i ].touchArea = checkboxes[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    const content = new VBox( {
      children: checkboxes,
      align: 'left',
      spacing: spacing
    } );

    super( content, options );
  }
}

hookesLaw.register( 'IntroVisibilityPanel', IntroVisibilityPanel );