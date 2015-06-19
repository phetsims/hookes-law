// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring controls for a system with 2 springs in series.
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
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var leftSpringString = require( 'string!HOOKES_LAW/leftSpring' );
  var rightSpringString = require( 'string!HOOKES_LAW/rightSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );

  /**
   * @param {SeriesSystem} system
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSpringControls( system, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( _.clone( HookesLawConstants.SPRING_PANEL_OPTIONS ), options );

    var leftSpring = system.leftSpring;
    var leftSpringConstantControl = new SpringConstantControl( leftSpring.springConstantProperty, leftSpring.springConstantRange, {
      title: leftSpringString,
      thumbFillEnabled: HookesLawColors.LEFT_SPRING,
      trackSize: SPRING_CONSTANT_TRACK_SIZE,
      majorTickValues: [
        leftSpring.springConstantRange.min,
        leftSpring.springConstantRange.getCenter(),
        leftSpring.springConstantRange.max
      ]
    } );

    var rightSpring = system.rightSpring;
    var rightSpringConstantControl = new SpringConstantControl( system.rightSpring.springConstantProperty, system.rightSpring.springConstantRange, {
      title: rightSpringString,
      thumbFillEnabled: HookesLawColors.RIGHT_SPRING,
      trackSize: SPRING_CONSTANT_TRACK_SIZE,
      majorTickValues: [
        rightSpring.springConstantRange.min,
        rightSpring.springConstantRange.getCenter(),
        rightSpring.springConstantRange.max
      ]
    } );

    var appliedForceControl = new AppliedForceControl(
      system.equivalentSpring.appliedForceProperty, system.equivalentSpring.appliedForceRange, numberOfInteractionsInProgressProperty );

    var separatorHeight = Math.max( Math.max( leftSpringConstantControl.height, rightSpringConstantControl.height ), appliedForceControl.height );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [
        leftSpringConstantControl,
        new VSeparator( separatorHeight, HookesLawConstants.SEPARATOR_OPTIONS ),
        rightSpringConstantControl,
        new VSeparator( separatorHeight, HookesLawConstants.SEPARATOR_OPTIONS ),
        appliedForceControl
      ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SeriesSpringControls );
} );
