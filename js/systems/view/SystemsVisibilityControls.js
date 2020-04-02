// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Systems" view.
 * This control panel is a bit similar to IntroVisibilityPanel, but it provides 2 choices
 * ('total' and 'components') for how the spring force is represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import BracketNode from '../../../../scenery-phet/js/BracketNode.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';

// strings
const appliedForceString = hookesLawStrings.appliedForce;
const componentsString = hookesLawStrings.components;
const displacementString = hookesLawStrings.displacement;
const springForceString = hookesLawStrings.springForce;
const totalString = hookesLawStrings.total;
const valuesString = hookesLawStrings.values;

class SystemsVisibilityControls extends Panel {

  /**
   * @param {SystemsViewProperties} properties
   * @param {Object} [options]
   */
  constructor( properties, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // vector checkboxes
    const appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        { arrowFill: HookesLawColors.APPLIED_FORCE } ),
      properties.appliedForceVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const springForceCheckbox = new Checkbox(
      new Text( springForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.springForceVectorVisibleProperty,
      merge( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECKBOX_OPTIONS ) );

    const displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS ), {
        arrowFill: HookesLawColors.DISPLACEMENT,
        vectorType: 'displacement'
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

    // Label for 'total' radio button
    const totalRadioButtonLabel = new HBox( {
      children: [
        new Text( totalString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.SINGLE_SPRING } )
      ],
      spacing: 10
    } );

    // Label for 'components' radio button
    const componentsIcon1 = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.TOP_SPRING } );
    const componentsIcon2 = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.BOTTOM_SPRING } );
    const componentsIcons = new VBox( {
      children: [
        componentsIcon1,
        componentsIcon2
      ],
      spacing: 10
    } );
    const componentsRadioButtonLabel = new HBox( {
      touchAreaXDilation: 10,
      touchAreaYDilation: 4,
      children: [
        new Text( componentsString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        new BracketNode( {
          orientation: 'left',
          bracketLength: componentsIcons.height
        } ),
        componentsIcons
      ],
      spacing: 10
    } );

    // Change the component vector colors to match the system
    properties.seriesParallelProperty.link( seriesParallel => {
      componentsIcon1.fill = ( seriesParallel === 'series' ) ? HookesLawColors.LEFT_SPRING : HookesLawColors.TOP_SPRING;
      componentsIcon2.fill = ( seriesParallel === 'series' ) ? HookesLawColors.RIGHT_SPRING : HookesLawColors.BOTTOM_SPRING;
    } );

    const radioButtonItems = [
      { value: 'total', node: totalRadioButtonLabel, tandemName: 'totalRadioButton' },
      { value: 'components', node: componentsRadioButtonLabel, tandemName: 'componentsRadioButton' }
    ];

    const radioButtonGroup = new AquaRadioButtonGroup( properties.springForceRepresentationProperty, radioButtonItems, {
      spacing: 10,
      radioButtonOptions: HookesLawConstants.RADIO_BUTTON_OPTIONS
    } );

    const radioButtonsSubPanel = new HBox( {
      children: [ new HStrut( 25 ), radioButtonGroup ],
      spacing: 5
    } );

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Property.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      ( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) => {
        valuesCheckbox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Radio buttons should be enabled only if 'spring force' is checked
    properties.springForceVectorVisibleProperty.link( springForceVectorVisible => {
      radioButtonGroup.enabled = springForceVectorVisible;
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

hookesLaw.register( 'SystemsVisibilityControls', SystemsVisibilityControls );

export default SystemsVisibilityControls;