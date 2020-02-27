// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceControl from '../../common/view/AppliedForceControl.js';
import SpringConstantControl from '../../common/view/SpringConstantControl.js';
import hookesLawStrings from '../../hookes-law-strings.js';
import hookesLaw from '../../hookesLaw.js';

const appliedForceNumberString = hookesLawStrings.appliedForceNumber;
const springConstantNumberString = hookesLawStrings.springConstantNumber;

// constants
const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

/**
 * @param {Spring} spring
 * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
 * @param {Object} [options]
 * @constructor
 */
function IntroSpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

  options = merge( {
    number: 1, // {number} used to label the controls, eg "Spring Constant 1"

    // HBox options
    spacing: 10,

    // phet-io
    tandem: Tandem.REQUIRED
  }, options );

  // Tandems for Panels that contain the controls
  const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
  const appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

  const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
    title: StringUtils.format( springConstantNumberString, options.number ),
    sliderOptions: {
      majorTickValues: [
        spring.springConstantRange.min,
        spring.springConstantRange.max / 2,
        spring.springConstantRange.max
      ]
    },
    tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
  } );

  const appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, spring.appliedForceRange,
    numberOfInteractionsInProgressProperty, {
      title: StringUtils.format( appliedForceNumberString, options.number ),
      tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
    } );

  assert && assert( !options.children, 'IntroSpringControls sets children' );
  options.children = [
    new Panel( springConstantControl, merge( { tandem: springConstantPanelTandem }, SPRING_PANEL_OPTIONS ) ),
    new Panel( appliedForceControl, merge( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
  ];
  HBox.call( this, options );
}

hookesLaw.register( 'IntroSpringControls', IntroSpringControls );

inherit( HBox, IntroSpringControls );
export default IntroSpringControls;