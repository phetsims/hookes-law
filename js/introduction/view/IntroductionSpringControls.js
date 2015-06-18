// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring controls for the "Introduction" screen.
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
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  var springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

  /**
   * @param {Spring} spring
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function IntroductionSpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      number: 1
    }, _.extend( _.clone( HookesLawConstants.SPRING_PANEL_OPTIONS ), options ) );

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

    var verticalSeparator = new VSeparator( Math.max( springConstantControl.height, appliedForceControl.height ), HookesLawConstants.SEPARATOR_OPTIONS );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [ springConstantControl, verticalSeparator, appliedForceControl ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, IntroductionSpringControls );
} );
