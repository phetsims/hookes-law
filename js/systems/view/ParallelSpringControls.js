// Copyright 2015-2021, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in parallel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, VBox } from '../../../../scenery/js/imports.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';

// constants
const SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

class ParallelSpringControls extends HBox {

  /**
   * @param {ParallelSystem} system
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

    const topSpring = system.topSpring;
    const topSpringConstantControl = new SpringConstantControl( topSpring.springConstantProperty, topSpring.springConstantRange, {
      title: hookesLawStrings.topSpring,
      sliderOptions: {
        thumbFill: HookesLawColors.TOP_SPRING,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTickValues: [
          topSpring.springConstantRange.min,
          topSpring.springConstantRange.getCenter(),
          topSpring.springConstantRange.max
        ]
      },
      tandem: springConstantsPanelTandem.createTandem( 'topSpringConstantControl' )
    } );

    const bottomSpring = system.bottomSpring;
    const bottomSpringConstantControl = new SpringConstantControl(
      bottomSpring.springConstantProperty, bottomSpring.springConstantRange, {
        title: hookesLawStrings.bottomSpring,
        sliderOptions: {
          thumbFill: HookesLawColors.BOTTOM_SPRING,
          trackSize: SPRING_CONSTANT_TRACK_SIZE,
          majorTickValues: [
            bottomSpring.springConstantRange.min,
            bottomSpring.springConstantRange.getCenter(),
            bottomSpring.springConstantRange.max
          ]
        },
        tandem: springConstantsPanelTandem.createTandem( 'bottomSpringConstantControl' )
      } );

    // "top" control above "bottom" control, to reflect layout of system
    const springControls = new VBox( {
      spacing: 5,
      resize: false,
      children: [
        topSpringConstantControl,
        new HSeparator( Math.max( topSpringConstantControl.width, bottomSpringConstantControl.width ), HookesLawConstants.SEPARATOR_OPTIONS ),
        bottomSpringConstantControl
      ],
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    const appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    assert && assert( !options.children, 'ParallelSpringControls sets children' );
    options.children = [
      new Panel( springControls, merge( { tandem: springConstantsPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( appliedForceControl, merge( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    super( options );
  }
}

hookesLaw.register( 'ParallelSpringControls', ParallelSpringControls );

export default ParallelSpringControls;