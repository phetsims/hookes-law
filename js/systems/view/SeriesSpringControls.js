// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in series.
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
  const inherit = require( 'PHET_CORE/inherit' );
  const Panel = require( 'SUN/Panel' );
  const SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  const Tandem = require( 'TANDEM/Tandem' );
  const VSeparator = require( 'SUN/VSeparator' );

  // strings
  const leftSpringString = require( 'string!HOOKES_LAW/leftSpring' );
  const rightSpringString = require( 'string!HOOKES_LAW/rightSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
  var SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {SeriesSystem} system
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSpringControls( system, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {

      // HBox options
      spacing: 10,

      // phet-io
      tandem: Tandem.required
    }, options );

    // Tandems for Panels that contain the controls
    var springConstantsPanelTandem = options.tandem.createTandem( 'springConstantsPanel' );
    var appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    var leftSpring = system.leftSpring;
    var leftSpringConstantControl = new SpringConstantControl( leftSpring.springConstantProperty, leftSpring.springConstantRange, {
      title: leftSpringString,
      
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

    var rightSpring = system.rightSpring;
    var rightSpringConstantControl = new SpringConstantControl( system.rightSpring.springConstantProperty, system.rightSpring.springConstantRange, {
      title: rightSpringString,

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
    var springControls = new HBox( {
      spacing: 20,
      children: [
        leftSpringConstantControl,
        new VSeparator( Math.max( leftSpringConstantControl.height, rightSpringConstantControl.height ) ),
        rightSpringConstantControl
      ]
    } );

    var appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    assert && assert( !options.children, 'SeriesSpringControls sets children' );
    options.children = [
      new Panel( springControls, _.extend( { tandem: springConstantsPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( appliedForceControl, _.extend( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    HBox.call( this, options );
  }

  hookesLaw.register( 'SeriesSpringControls', SeriesSpringControls );

  return inherit( HBox, SeriesSpringControls );
} );
