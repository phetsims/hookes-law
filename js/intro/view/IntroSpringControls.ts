// Copyright 2015-2025, University of Colorado Boulder

/**
 * Spring controls for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import Spring from '../../common/model/Spring.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

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
      spacing: 10,
      excludeInvisibleChildrenFromBounds: false,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    assert && assert( Number.isInteger( options.systemNumber ) && options.systemNumber >= 1 );

    // Tandems for Panels that contain the controls
    const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    const springConstantControlTandem = springConstantPanelTandem.createTandem( 'springConstantControl' );
    const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      titleStringProperty: new DerivedStringProperty( [ HookesLawStrings.springConstantNumberStringProperty ],
        pattern => StringUtils.format( pattern, options.systemNumber ), {
          tandem: springConstantControlTandem.createTandem( 'titleStringProperty' )
        }
      ),
      majorTickValues: [
        spring.springConstantRange.min,
        spring.springConstantRange.max / 2,
        spring.springConstantRange.max
      ],
      minorTickSpacing: 100,
      tandem: springConstantControlTandem,
      phetioVisiblePropertyInstrumented: false // see https://github.com/phetsims/hookes-law/issues/111
    } );

    const springConstantPanel = new Panel( springConstantControl,
      combineOptions<PanelOptions>( {}, HookesLawConstants.SPRING_PANEL_OPTIONS, {
        layoutOptions: {
          stretch: true
        },
        tandem: springConstantPanelTandem
      } ) );

    const appliedForceControlTandem = appliedForcePanelTandem.createTandem( 'appliedForceControl' );
    const appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, spring.appliedForceRange,
      numberOfInteractionsInProgressProperty, {
        titleStringProperty: new DerivedStringProperty( [ HookesLawStrings.appliedForceNumberStringProperty ],
          pattern => StringUtils.format( pattern, options.systemNumber ), {
            tandem: appliedForceControlTandem.createTandem( 'titleStringProperty' )
          } ),
        tandem: appliedForceControlTandem,
        phetioVisiblePropertyInstrumented: false // see https://github.com/phetsims/hookes-law/issues/111
      } );

    const appliedForcePanel = new Panel( appliedForceControl,
      combineOptions<PanelOptions>( {}, HookesLawConstants.SPRING_PANEL_OPTIONS, {
        layoutOptions: {
          stretch: true
        },
        tandem: appliedForcePanelTandem
      } ) );

    options.children = [ springConstantPanel, appliedForcePanel ];

    super( options );
  }
}

hookesLaw.register( 'IntroSpringControls', IntroSpringControls );