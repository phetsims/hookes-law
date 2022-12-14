// Copyright 2015-2022, University of Colorado Boulder

/**
 * Spring controls for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { HBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import DisplacementControl from '../../common/view/DisplacementControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';

// constants
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

export default class EnergySpringControls extends HBox {
  /**
   * @param {Spring} spring
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   */
  constructor( spring, numberOfInteractionsInProgressProperty, options ) {

    options = merge( {

      // HBox options
      spacing: 10,
      tandem: Tandem.REQUIRED
    }, options );

    // Tandems for Panels that contain the controls
    const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    const displacementPanelTandem = options.tandem.createTandem( 'displacementPanel' );

    const springConstantMajorTickValues = [];
    for ( let value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      springConstantMajorTickValues.push( value );
    }

    const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      sliderOptions: {
        minorTickSpacing: 50,
        majorTickValues: springConstantMajorTickValues
      },
      tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
    } );

    const displacementControl = new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgressProperty, {
      sliderOptions: {
        minorTickSpacing: spring.displacementRange.getLength() / 10,
        majorTickValues: [
          spring.displacementRange.min,
          spring.displacementRange.getCenter(),
          spring.displacementRange.max
        ]
      },
      tandem: displacementPanelTandem.createTandem( 'displacementControl' )
    } );

    assert && assert( !options.children, 'EnergySpringControls sets children' );

    options.children = [
      new Panel( springConstantControl, merge( { tandem: springConstantPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( displacementControl, merge( { tandem: displacementPanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'EnergySpringControls', EnergySpringControls );