// Copyright 2015-2022, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in series.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import VSeparatorDeprecated from '../../../../sun/js/VSeparatorDeprecated.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

// constants
const SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

class SeriesSpringControls extends HBox {

  /**
   * @param {SeriesSystem} system
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   */
  constructor( system, numberOfInteractionsInProgressProperty, options ) {

    options = merge( {

      // HBox options
      spacing: 10,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // Tandems for Panels that contain the controls
    const springConstantsPanelTandem = options.tandem.createTandem( 'springConstantsPanel' );
    const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    const leftSpring = system.leftSpring;
    const leftSpringConstantControl = new SpringConstantControl( leftSpring.springConstantProperty, leftSpring.springConstantRange, {
      title: HookesLawStrings.leftSpring,

      // NumberControl options
      sliderOptions: {
        thumbFill: HookesLawColors.LEFT_SPRING,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTickValues: [
          leftSpring.springConstantRange.min,
          leftSpring.springConstantRange.getCenter(),
          leftSpring.springConstantRange.max
        ]
      },
      tandem: springConstantsPanelTandem.createTandem( 'leftSpringConstantControl' )
    } );

    const rightSpring = system.rightSpring;
    const rightSpringConstantControl = new SpringConstantControl( system.rightSpring.springConstantProperty, system.rightSpring.springConstantRange, {
      title: HookesLawStrings.rightSpring,

      // NumberControl options
      sliderOptions: {
        thumbFill: HookesLawColors.RIGHT_SPRING,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTickValues: [
          rightSpring.springConstantRange.min,
          rightSpring.springConstantRange.getCenter(),
          rightSpring.springConstantRange.max
        ]
      },
      tandem: springConstantsPanelTandem.createTandem( 'rightSpringConstantControl' )
    } );

    // "left" control to the left of "right" control, to reflect layout of system
    const springControls = new HBox( {
      spacing: 20,
      children: [
        leftSpringConstantControl,
        new VSeparatorDeprecated( Math.max( leftSpringConstantControl.height, rightSpringConstantControl.height ) ),
        rightSpringConstantControl
      ]
    } );

    const appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    assert && assert( !options.children, 'SeriesSpringControls sets children' );
    options.children = [
      new Panel( springControls, merge( { tandem: springConstantsPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( appliedForceControl, merge( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'SeriesSpringControls', SeriesSpringControls );

export default SeriesSpringControls;