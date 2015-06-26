// Copyright 2002-2015, University of Colorado Boulder

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
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var bottomSpringString = require( 'string!HOOKES_LAW/bottomSpring' );
  var topSpringString = require( 'string!HOOKES_LAW/topSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );

  /**
   * @param {ParallelSystem} system
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSpringControls( system, numberOfInteractionsInProgressProperty, options ) {

    options = options || {};

    var topSpring = system.topSpring;
    var topSpringConstantControl = new SpringConstantControl( topSpring.springConstantProperty, topSpring.springConstantRange, {
      title: topSpringString,
      thumbFillEnabled: HookesLawColors.TOP_SPRING,
      trackSize: SPRING_CONSTANT_TRACK_SIZE,
      majorTickValues: [
        topSpring.springConstantRange.min,
        topSpring.springConstantRange.getCenter(),
        topSpring.springConstantRange.max
      ]
    } );

    var bottomSpring = system.bottomSpring;
    var bottomSpringConstantControl = new SpringConstantControl(
      bottomSpring.springConstantProperty, bottomSpring.springConstantRange, {
        title: bottomSpringString,
        thumbFillEnabled: HookesLawColors.BOTTOM_SPRING,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTickValues: [
          bottomSpring.springConstantRange.min,
          bottomSpring.springConstantRange.getCenter(),
          bottomSpring.springConstantRange.max
        ]
      } );

    // "top" control above "bottom" control
    var springControls = new VBox( {
      spacing: 5,
      resize: false,
      children: [
        new Panel( topSpringConstantControl, HookesLawConstants.SPRING_PANEL_OPTIONS ),
        new Panel( bottomSpringConstantControl, HookesLawConstants.SPRING_PANEL_OPTIONS )
      ]
    } );

    var appliedForceControl = new AppliedForceControl(
      system.equivalentSpring.appliedForceProperty, system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty );

    options.spacing = 5;
    options.children = [
      springControls,
      new Panel( appliedForceControl, HookesLawConstants.SPRING_PANEL_OPTIONS )
    ];
    HBox.call( this, options );
  }

  return inherit( HBox, ParallelSpringControls );
} );
