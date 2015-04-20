// Copyright 2002-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var AppliedForceControl = require( 'HOOKES_LAW/common/view/AppliedForceControl' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
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
   * @param {Object} [options]
   * @constructor
   */
  function SpringControlPanel( spring, options ) {

    options = _.extend( {
      number: 1,
      xMargin: 20,
      yMargin: 5,
      fill: HookesLawColors.CONTROL_PANEL_FILL
    }, options );

    var springConstantControl = new SpringConstantControl( spring.springConstantProperty, HookesLawConstants.SPRING_CONSTANT_RANGE, {
      title: StringUtils.format( springConstantNumberString, options.number )
    } );

    var appliedForceControl = new AppliedForceControl( spring.appliedForceProperty, HookesLawConstants.APPLIED_FORCE_RANGE, {
      title: StringUtils.format( appliedForceNumberString, options.number )
    } );

    var verticalSeparator = new VSeparator( Math.max( springConstantControl.height, appliedForceControl.height ) );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [ springConstantControl, verticalSeparator, appliedForceControl ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SpringControlPanel );
} );
