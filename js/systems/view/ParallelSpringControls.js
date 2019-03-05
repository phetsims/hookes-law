// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in parallel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppliedForceControl = require( 'HOOKES_LAW/common/view/AppliedForceControl' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var Tandem = require( 'TANDEM/Tandem' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bottomSpringString = require( 'string!HOOKES_LAW/bottomSpring' );
  var topSpringString = require( 'string!HOOKES_LAW/topSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
  var SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {ParallelSystem} system
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSpringControls( system, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {

      // HBox options
      spacing: 10,

      // phet-io
      tandem: Tandem.required
    }, options );

    // Tandems for Panels that contain the controls
    var springConstantsPanelTandem = options.tandem.createTandem( 'springConstantsPanel' );
    var appliedForcePanelTandem = options.tandem.createTandem( 'appliedForcePanel' );

    var topSpring = system.topSpring;
    var topSpringConstantControl = new SpringConstantControl( topSpring.springConstantProperty, topSpring.springConstantRange, {
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

    var bottomSpring = system.bottomSpring;
    var bottomSpringConstantControl = new SpringConstantControl(
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
    var springControls = new VBox( {
      spacing: 5,
      resize: false,
      children: [
        topSpringConstantControl,
        new HSeparator( Math.max( topSpringConstantControl.width, bottomSpringConstantControl.width ), HookesLawConstants.SEPARATOR_OPTIONS ),
        bottomSpringConstantControl
      ],
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    var appliedForceControl = new AppliedForceControl( system.equivalentSpring.appliedForceProperty,
      system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty, {
        tandem: appliedForcePanelTandem.createTandem( 'appliedForceControl' )
      } );

    assert && assert( !options.children, 'ParallelSpringControls sets children' );
    options.children = [
      new Panel( springControls, _.extend( { tandem: springConstantsPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( appliedForceControl, _.extend( { tandem: appliedForcePanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    HBox.call( this, options );
  }

  hookesLaw.register( 'ParallelSpringControls', ParallelSpringControls );

  return inherit( HBox, ParallelSpringControls );
} );
