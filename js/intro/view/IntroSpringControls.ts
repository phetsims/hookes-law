// Copyright 2015-2022, University of Colorado Boulder

/**
 * Spring controls for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { HBox, HBoxOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import Spring from '../../common/model/Spring.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';

// constants
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

type SelfOptions = {
  systemNumber: number; // used to label the controls, eg "Spring Constant 1"
};

type IntroSpringControlsOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<HBoxOptions, 'maxWidth'> & PickRequired<HBoxOptions, 'tandem'>;

export default class IntroSpringControls extends HBox {

  /**
   * @param spring
   * @param numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param providedOptions
   */
  public constructor( spring: Spring, numberOfInteractionsInProgressProperty: Property<number>,
                      providedOptions: IntroSpringControlsOptions ) {

    const options = optionize<IntroSpringControlsOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      spacing: 10
    }, providedOptions );

    assert && assert( Number.isInteger( options.systemNumber ) && options.systemNumber >= 1 );

    // Tandems for Panels that contain the controls
    const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      titleStringProperty: new DerivedProperty(
        [ HookesLawStrings.springConstantNumberStringProperty ],
        pattern => StringUtils.format( pattern, options.systemNumber )
      ),
      majorTickValues: [
        spring.springConstantRange.min,
        spring.springConstantRange.max / 2,
        spring.springConstantRange.max
      ],
      minorTickSpacing: 100,
      tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
    } );

    const appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, spring.appliedForceRange,
      numberOfInteractionsInProgressProperty, {
        titleStringProperty: new DerivedProperty(
          [ HookesLawStrings.appliedForceNumberStringProperty ],
          pattern => StringUtils.format( pattern, options.systemNumber )
        ),
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    options.children = [
      new Panel( springConstantControl,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: springConstantPanelTandem } ) ),
      new Panel( appliedForceControl,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: appliedForcePanelTandem } ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'IntroSpringControls', IntroSpringControls );