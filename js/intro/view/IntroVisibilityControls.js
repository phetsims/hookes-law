// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Intro" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLawStrings from '../../hookes-law-strings.js';
import hookesLaw from '../../hookesLaw.js';

// strings
const appliedForceString = hookesLawStrings.appliedForce;
const displacementString = hookesLawStrings.displacement;
const springForceString = hookesLawStrings.springForce;
const valuesString = hookesLawStrings.values;

class IntroVisibilityControls extends Panel {

  /**
   * @param {IntroViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // text labels on the vector checkboxes
    const appliedForceTextNode = new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const springForceTextNode = new Text( springForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const displacementTextNode = new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    const maxTextWidth =
      _.maxBy( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], node => node.width ).width;

    const minSpacing = 10;

    // vector checkboxes, with left-aligned vector icons
    const appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( appliedForceTextNode, {
        arrowFill: HookesLawColors.APPLIED_FORCE,
        spacing: maxTextWidth - appliedForceTextNode.width + minSpacing
      } ),
      properties.appliedForceVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( springForceTextNode, {
        arrowFill: HookesLawColors.SINGLE_SPRING,
        spacing: maxTextWidth - springForceTextNode.width + minSpacing
      } ),
      properties.springForceVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( displacementTextNode, {
        vectorType: 'displacement',
        arrowFill: HookesLawColors.DISPLACEMENT,
        spacing: maxTextWidth - displacementTextNode.width + minSpacing
      } ),
      properties.displacementVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    // other checkboxes
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

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Property.multilink(
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

hookesLaw.register( 'IntroVisibilityControls', IntroVisibilityControls );

export default IntroVisibilityControls;