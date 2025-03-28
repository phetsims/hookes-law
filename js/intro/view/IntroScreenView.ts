// Copyright 2015-2025, University of Colorado Boulder

/**
 * View for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import IntroModel from '../model/IntroModel.js';
import IntroAnimator from './IntroAnimator.js';
import IntroSystemNode from './IntroSystemNode.js';
import IntroViewProperties from './IntroViewProperties.js';
import IntroVisibilityPanel from './IntroVisibilityPanel.js';
import NumberOfSystemsRadioButtonGroup from './NumberOfSystemsRadioButtonGroup.js';

export default class IntroScreenView extends ScreenView {

  // Animates the transitions between 1 and 2 systems
  private readonly animator: IntroAnimator;

  public constructor( model: IntroModel, tandem: Tandem ) {

    super( {
      tandem: tandem
    } );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new IntroViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityPanel = new IntroVisibilityPanel( viewProperties, {
      tandem: tandem.createTandem( 'visibilityPanel' )
    } );

    // Radio buttons for switching between 1 and 2 systems
    const numberOfSystemsRadioButtonGroup = new NumberOfSystemsRadioButtonGroup( viewProperties.numberOfSystemsProperty,
      tandem.createTandem( 'numberOfSystemsRadioButtonGroup' ) );

    // Controls at top right
    const controls = new VBox( {
      spacing: 10,
      children: [ visibilityPanel, numberOfSystemsRadioButtonGroup ]
    } );
    controls.localBoundsProperty.link( () => {
      controls.right = this.layoutBounds.right - 10;
      controls.top = this.layoutBounds.top + 10;
    } );

    // System 1
    const system1Node = new IntroSystemNode( model.system1, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      systemNumber: 1,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      // y position is handled by this.animator
      tandem: tandem.createTandem( 'system1Node' )
    } );
    assert && assert( system1Node.height <= this.layoutBounds.height / 2, 'system1Node is taller than the space available for it' );

    // System 2
    const system2Node = new IntroSystemNode( model.system2, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      systemNumber: 2,
      left: system1Node.left,
      // y position is handled by this.animator
      tandem: tandem.createTandem( 'system2Node' )
    } );
    assert && assert( system2Node.height <= this.layoutBounds.height / 2, 'system2Node is taller than the space available for it' );

    // Interrupt interaction with the systems when the number of systems changes.
    viewProperties.numberOfSystemsProperty.link( () => {
      system1Node.interruptSubtreeInput();
      system2Node.interruptSubtreeInput();
    } );

    // Reset All button, bottom right
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    const screenViewRootNode = new Node( {
      children: [
        controls,
        system1Node,
        system2Node,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      system1Node,
      system2Node
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      controls,
      resetAllButton
    ];

    this.animator = new IntroAnimator( viewProperties.numberOfSystemsProperty, system1Node, system2Node, this.layoutBounds );
  }

  /**
   * Advances animation.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    this.animator.step( dt );
    super.step( dt );
  }
}

hookesLaw.register( 'IntroScreenView', IntroScreenView );