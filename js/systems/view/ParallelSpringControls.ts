// Copyright 2015-2022, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in parallel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, HBoxOptions, HSeparator, NodeTranslationOptions, VBox } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import ParallelSystem from '../model/ParallelSystem.js';

// constants
const SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

type SelfOptions = EmptySelfOptions;

type ParallelSpringControlsOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<HBoxOptions, 'maxWidth'> & PickRequired<HBoxOptions, 'tandem'>;

export default class ParallelSpringControls extends HBox {

  /**
   * @param system
   * @param numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param providedOptions
   */
  public constructor( system: ParallelSystem, numberOfInteractionsInProgressProperty: Property<number>,
                      providedOptions: ParallelSpringControlsOptions ) {

    const options = optionize<ParallelSpringControlsOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      spacing: 10
    }, providedOptions );

    // Tandems for Panels that contain the controls
    const springConstantsPanelTandem = options.tandem.createTandem( 'springConstantsPanel' );
    const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    const topSpring = system.topSpring;
    const topSpringConstantControl = new SpringConstantControl( topSpring.springConstantProperty, topSpring.springConstantRange, {
      titleStringProperty: HookesLawStrings.topSpringStringProperty,
      majorTickValues: [
        topSpring.springConstantRange.min,
        topSpring.springConstantRange.getCenter(),
        topSpring.springConstantRange.max
      ],
      minorTickSpacing: 100,
      sliderOptions: {
        thumbFill: HookesLawColors.TOP_SPRING,
        trackSize: SPRING_CONSTANT_TRACK_SIZE
      },
      tandem: springConstantsPanelTandem.createTandem( 'topSpringConstantControl' )
    } );

    const bottomSpring = system.bottomSpring;
    const bottomSpringConstantControl = new SpringConstantControl(
      bottomSpring.springConstantProperty, bottomSpring.springConstantRange, {
        titleStringProperty: HookesLawStrings.bottomSpringStringProperty,
        majorTickValues: [
          bottomSpring.springConstantRange.min,
          bottomSpring.springConstantRange.getCenter(),
          bottomSpring.springConstantRange.max
        ],
        minorTickSpacing: 100,
        sliderOptions: {
          thumbFill: HookesLawColors.BOTTOM_SPRING,
          trackSize: SPRING_CONSTANT_TRACK_SIZE
        },
        tandem: springConstantsPanelTandem.createTandem( 'bottomSpringConstantControl' )
      } );

    // "top" control above "bottom" control, to reflect layout of system
    const springControls = new VBox( {
      spacing: 5,
      resize: false,
      children: [
        topSpringConstantControl,
        new HSeparator( HookesLawConstants.HSEPARATOR_OPTIONS ),
        bottomSpringConstantControl
      ],
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    const appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    options.children = [
      new Panel( springControls,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: springConstantsPanelTandem } ) ),
      new Panel( appliedForceControl,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: appliedForcePanelTandem } ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'ParallelSpringControls', ParallelSpringControls );