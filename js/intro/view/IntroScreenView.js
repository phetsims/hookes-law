// Copyright 2015-2020, University of Colorado Boulder

/**
 * View for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import IntroAnimator from './IntroAnimator.js';
import IntroSystemNode from './IntroSystemNode.js';
import IntroViewProperties from './IntroViewProperties.js';
import IntroVisibilityControls from './IntroVisibilityControls.js';
import NumberOfSystemsRadioButtonGroup from './NumberOfSystemsRadioButtonGroup.js';

class IntroScreenView extends ScreenView {

  /**
   * @param {IntroModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( merge( {}, HookesLawConstants.SCREEN_VIEW_OPTIONS, {

      // phet-io
      tandem: tandem
    } ) );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new IntroViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityControls = new IntroVisibilityControls( viewProperties, {
      maxWidth: 250, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityControls' )
    } );

    // Radio buttons for switching between 1 and 2 systems
    const numberOfSystemsRadioButtonGroup = new NumberOfSystemsRadioButtonGroup( viewProperties.numberOfSystemsProperty, {
      tandem: tandem.createTandem( 'numberOfSystemsRadioButtonGroup' )
    } );

    // horizontally center the controls
    this.addChild( new VBox( {
      spacing: 10,
      children: [ visibilityControls, numberOfSystemsRadioButtonGroup ],
      right: this.layoutBounds.right - 10,
      top: this.layoutBounds.top + 10
    } ) );

    // System 1
    const system1Node = new IntroSystemNode( model.system1, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 1,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: ( viewProperties.numberOfSystemsProperty.get() === 1 ) ? this.layoutBounds.centerY : ( 0.25 * this.layoutBounds.height ),
      tandem: tandem.createTandem( 'system1Node' )
    } );
    this.addChild( system1Node );
    assert && assert( system1Node.height <= this.layoutBounds.height / 2, 'system1Node is taller than the space available for it' );

    // System 2
    const system2Node = new IntroSystemNode( model.system2, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 2,
      left: system1Node.left,
      centerY: 0.75 * this.layoutBounds.height,
      visible: ( viewProperties.numberOfSystemsProperty.get() === 2 ),
      tandem: tandem.createTandem( 'system2Node' )
    } );
    this.addChild( system2Node );
    assert && assert( system2Node.height <= this.layoutBounds.height / 2, 'system2Node is taller than the space available for it' );

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
    this.addChild( resetAllButton );

    // @private Animates the transitions between 1 and 2 systems
    this.animator = new IntroAnimator( viewProperties.numberOfSystemsProperty, system1Node, system2Node,
      this.layoutBounds, tandem );
  }

  /**
   * Advances animation.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    this.animator.step( dt );
  }
}

hookesLaw.register( 'IntroScreenView', IntroScreenView );

export default IntroScreenView;