// Copyright 2020-2021, University of Colorado Boulder

/**
 * SpringForceRadioButtonGroup is the radio button group used to select which vector representation of spring force
 * is display. The choices are 'Total' or 'Components'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import BracketNode from '../../../../scenery-phet/js/BracketNode.js';
import { HBox, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButtonGroup from '../../../../sun/js/AquaRadioButtonGroup.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';
import SpringForceRepresentation from './SpringForceRepresentation.js';
import SystemType from './SystemType.js';

class SpringForceRadioButtonGroup extends AquaRadioButtonGroup {

  /**
   * @param {Property.<string>} springForceRepresentationProperty
   * @param {Property.<string>} systemTypeProperty
   * @param {Object} [options]
   */
  constructor( springForceRepresentationProperty, systemTypeProperty, options ) {

    options = merge( {
      spacing: 10,
      radioButtonOptions: HookesLawConstants.RADIO_BUTTON_OPTIONS
    }, options );

    // Label for 'Total' radio button
    const totalRadioButtonLabel = new HBox( {
      children: [
        new Text( hookesLawStrings.total, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.SINGLE_SPRING } )
      ],
      spacing: 10
    } );

    // Label for 'Components' radio button
    const componentsIcon1 = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.TOP_SPRING } );
    const componentsIcon2 = HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.BOTTOM_SPRING } );
    const componentsIcons = new VBox( {
      children: [ componentsIcon1, componentsIcon2 ],
      spacing: 10
    } );
    const componentsRadioButtonLabel = new HBox( {
      touchAreaXDilation: 10,
      touchAreaYDilation: 4,
      children: [
        new Text( hookesLawStrings.components, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        new BracketNode( {
          orientation: 'left',
          bracketLength: componentsIcons.height
        } ),
        componentsIcons
      ],
      spacing: 10
    } );

    // Change the component vector colors to match the spring system
    systemTypeProperty.link( systemType => {
      componentsIcon1.fill = ( systemType === SystemType.SERIES ) ? HookesLawColors.LEFT_SPRING : HookesLawColors.TOP_SPRING;
      componentsIcon2.fill = ( systemType === SystemType.SERIES ) ? HookesLawColors.RIGHT_SPRING : HookesLawColors.BOTTOM_SPRING;
    } );

    // Descriptions of the radio buttons.
    const buttonDescriptions = [
      { value: SpringForceRepresentation.TOTAL, node: totalRadioButtonLabel, tandemName: 'totalRadioButton' },
      { value: SpringForceRepresentation.COMPONENTS, node: componentsRadioButtonLabel, tandemName: 'componentsRadioButton' }
    ];

    super( springForceRepresentationProperty, buttonDescriptions, options );
  }
}

hookesLaw.register( 'SpringForceRadioButtonGroup', SpringForceRadioButtonGroup );
export default SpringForceRadioButtonGroup;