// Copyright 2015-2022, University of Colorado Boulder

/**
 * IntroVisibilityPanel contains controls for the visibility of various representations in the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
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

    // text labels on the vector checkboxes
    const appliedForceTextNode = new Text( HookesLawStrings.appliedForceStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const springForceTextNode = new Text( HookesLawStrings.springForceStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const displacementTextNode = new Text( HookesLawStrings.displacementStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const maxTextWidth =
      _.maxBy( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], node => node.width ).width;

    const minSpacing = 10;

    // vector checkboxes, with left-aligned vector icons
    const appliedForceCheckbox = new Checkbox( properties.appliedForceVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( appliedForceTextNode, {
      arrowFill: HookesLawColors.APPLIED_FORCE,
      spacing: maxTextWidth - appliedForceTextNode.width + minSpacing
    } ), merge( {
      tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceCheckbox = new Checkbox( properties.springForceVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( springForceTextNode, {
      arrowFill: HookesLawColors.SINGLE_SPRING,
      spacing: maxTextWidth - springForceTextNode.width + minSpacing
    } ), merge( {
      tandem: options.tandem.createTandem( 'springForceCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox( properties.displacementVectorVisibleProperty, HookesLawIconFactory.createVectorCheckboxContent( displacementTextNode, {
      vectorType: 'displacement',
      arrowFill: HookesLawColors.DISPLACEMENT,
      spacing: maxTextWidth - displacementTextNode.width + minSpacing
    } ), merge( {
      tandem: options.tandem.createTandem( 'displacementCheckbox' )
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // other checkboxes
    const equilibriumPositionCheckbox = new Checkbox( properties.equilibriumPositionVisibleProperty, HookesLawIconFactory.createEquilibriumPositionCheckboxContent(), merge( {
      tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
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