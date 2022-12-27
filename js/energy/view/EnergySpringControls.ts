// Copyright 2015-2022, University of Colorado Boulder

/**
 * Spring controls for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, HBoxOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import Spring from '../../common/model/Spring.js';
import DisplacementControl from '../../common/view/DisplacementControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';

// constants
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

type SelfOptions = EmptySelfOptions;

type EnergySpringControlsOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<HBoxOptions, 'maxWidth'> & PickRequired<HBoxOptions, 'tandem'>;

export default class EnergySpringControls extends HBox {
  /**
   * @param spring
   * @param numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param providedOptions
   */
  public constructor( spring: Spring, numberOfInteractionsInProgressProperty: Property<number>,
                      providedOptions: EnergySpringControlsOptions ) {

    const options = optionize<EnergySpringControlsOptions, SelfOptions, HBoxOptions>()( {

      // HBoxOptions
      spacing: 10
    }, providedOptions );

    // Tandems for Panels that contain the controls
    const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    const displacementPanelTandem = options.tandem.createTandem( 'displacementPanel' );

    const springConstantMajorTickValues = [];
    for ( let value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      springConstantMajorTickValues.push( value );
    }

    const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      majorTickValues: springConstantMajorTickValues,
      minorTickSpacing: 50,
      tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
    } );

    const displacementControl = new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgressProperty, {
      tandem: displacementPanelTandem.createTandem( 'displacementControl' )
    } );

    options.children = [
      new Panel( springConstantControl,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: springConstantPanelTandem } ) ),
      new Panel( displacementControl,
        combineOptions<PanelOptions>( {}, SPRING_PANEL_OPTIONS, { tandem: displacementPanelTandem } ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'EnergySpringControls', EnergySpringControls );