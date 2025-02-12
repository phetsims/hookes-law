// Copyright 2015-2025, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in series.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import VSeparator from '../../../../scenery/js/layout/nodes/VSeparator.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import SeriesSystem from '../model/SeriesSystem.js';

const SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );

type SelfOptions = EmptySelfOptions;

type SeriesSpringControlsOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<HBoxOptions, 'maxWidth'> & PickRequired<HBoxOptions, 'tandem'>;

export default class SeriesSpringControls extends HBox {

  /**
   * @param system
   * @param numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param providedOptions
   */
  public constructor( system: SeriesSystem, numberOfInteractionsInProgressProperty: Property<number>, providedOptions: SeriesSpringControlsOptions ) {

    const options = optionize<SeriesSpringControlsOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false
    }, providedOptions );

    // Tandems for Panels that contain the controls
    const springConstantsPanelTandem = options.tandem.createTandem( 'springConstantsPanel' );
    const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    const leftSpring = system.leftSpring;
    const leftSpringConstantControl = new SpringConstantControl( leftSpring.springConstantProperty, leftSpring.springConstantRange, {
      titleStringProperty: HookesLawStrings.leftSpringStringProperty,
      majorTickValues: [
        leftSpring.springConstantRange.min,
        leftSpring.springConstantRange.getCenter(),
        leftSpring.springConstantRange.max
      ],
      minorTickSpacing: 100,
      sliderOptions: {
        thumbFill: HookesLawColors.spring1MiddleColorProperty,
        trackSize: SPRING_CONSTANT_TRACK_SIZE
      },
      tandem: springConstantsPanelTandem.createTandem( 'leftSpringConstantControl' )
    } );

    const rightSpring = system.rightSpring;
    const rightSpringConstantControl = new SpringConstantControl( system.rightSpring.springConstantProperty, system.rightSpring.springConstantRange, {
      titleStringProperty: HookesLawStrings.rightSpringStringProperty,
      majorTickValues: [
        rightSpring.springConstantRange.min,
        rightSpring.springConstantRange.getCenter(),
        rightSpring.springConstantRange.max
      ],
      minorTickSpacing: 100,
      sliderOptions: {
        thumbFill: HookesLawColors.spring2MiddleColorProperty,
        trackSize: SPRING_CONSTANT_TRACK_SIZE
      },
      tandem: springConstantsPanelTandem.createTandem( 'rightSpringConstantControl' )
    } );

    // "left" control to the left of "right" control, to reflect layout of system
    const springControls = new HBox( {
      spacing: 20,
      children: [
        leftSpringConstantControl,
        new VSeparator(),
        rightSpringConstantControl
      ]
    } );

    const appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' ),
        phetioVisiblePropertyInstrumented: false // see https://github.com/phetsims/hookes-law/issues/111
      } );

    options.children = [
      new Panel( springControls,
        combineOptions<PanelOptions>( {}, HookesLawConstants.SPRING_PANEL_OPTIONS, {
          layoutOptions: {
            stretch: true
          },
          tandem: springConstantsPanelTandem
        } ) ),
      new Panel( appliedForceControl,
        combineOptions<PanelOptions>( {}, HookesLawConstants.SPRING_PANEL_OPTIONS, {
          layoutOptions: {
            stretch: true
          },
          tandem: appliedForcePanelTandem
        } ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'SeriesSpringControls', SeriesSpringControls );