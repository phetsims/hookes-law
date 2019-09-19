// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AppliedForceControl = require( 'HOOKES_LAW/common/view/AppliedForceControl' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Panel = require( 'SUN/Panel' );
  const SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  const springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

  // constants
  var SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {Spring} spring
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function IntroSpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      number: 1, // {number} used to label the controls, eg "Spring Constant 1"

      // HBox options
      spacing: 10,

      // phet-io
      tandem: Tandem.required
    }, options );

    // Tandems for Panels that contain the controls
    var springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    var appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    var springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
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

    var appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, spring.appliedForceRange,
      numberOfInteractionsInProgressProperty, {
        title: StringUtils.format( appliedForceNumberString, options.number ),
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    assert && assert( !options.children, 'IntroSpringControls sets children' );
    options.children = [
      new Panel( springConstantControl, _.extend( { tandem: springConstantPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( appliedForceControl, _.extend( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];
    HBox.call( this, options );
  }

  hookesLaw.register( 'IntroSpringControls', IntroSpringControls );

  return inherit( HBox, IntroSpringControls );
} );
