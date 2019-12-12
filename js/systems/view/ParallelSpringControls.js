// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in parallel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AppliedForceControl = require( 'HOOKES_LAW/common/view/AppliedForceControl' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HSeparator = require( 'SUN/HSeparator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const bottomSpringString = require( 'string!HOOKES_LAW/bottomSpring' );
  const topSpringString = require( 'string!HOOKES_LAW/topSpring' );

  // constants
  const SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
  const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {ParallelSystem} system
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSpringControls( system, numberOfInteractionsInProgressProperty, options ) {

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
      title: topSpringString,
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
        title: bottomSpringString,
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

    HBox.call( this, options );
  }

  hookesLaw.register( 'ParallelSpringControls', ParallelSpringControls );

  return inherit( HBox, ParallelSpringControls );
} );
