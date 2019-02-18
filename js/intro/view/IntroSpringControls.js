// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppliedForceControl = require( 'HOOKES_LAW/common/view/AppliedForceControl' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  var springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

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
