// Copyright 2002-2015, University of Colorado Boulder

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
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  var springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

  /**
   * @param {Spring} spring
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function IntroSpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      number: 1 // {number} used to label the controls, eg "Spring Constant 1"
    }, options );

    var springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      title: StringUtils.format( springConstantNumberString, options.number ),
      majorTickValues: [
        spring.springConstantRange.min,
        spring.springConstantRange.max / 2,
        spring.springConstantRange.max
      ]
    } );

    var appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, spring.appliedForceRange, numberOfInteractionsInProgressProperty, {
      title: StringUtils.format( appliedForceNumberString, options.number )
    } );

    options.spacing = 10;
    options.children = [
      new Panel( springConstantControl, HookesLawConstants.SPRING_PANEL_OPTIONS ) ,
      new Panel( appliedForceControl, HookesLawConstants.SPRING_PANEL_OPTIONS )
    ];
    HBox.call( this, options );
  }

  return inherit( HBox, IntroSpringControls );
} );
