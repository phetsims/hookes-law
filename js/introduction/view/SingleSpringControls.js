// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring controls for a single-spring system.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
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
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var appliedForceNumberString = require( 'string!HOOKES_LAW/appliedForceNumber' );
  var springConstantNumberString = require( 'string!HOOKES_LAW/springConstantNumber' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function SingleSpringControls( spring, options ) {

    options = _.extend( {
      number: 1,
      xMargin: 20,
      yMargin: 5,
      fill: HookesLawColors.CONTROL_PANEL_FILL
    }, options );

    var springConstantControl = new SpringConstantControl( StringUtils.format( springConstantNumberString, options.number ),
      spring.springConstantProperty, spring.springConstantRange, {
        majorTicks: [ {
          // min
          value: spring.springConstantRange.min,
          label: new Text( Util.toFixed( spring.springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // half of max
          value: spring.springConstantRange.max / 2,
          label: new Text( Util.toFixed( spring.springConstantRange.max / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // max
          value: spring.springConstantRange.max,
          label: new Text( Util.toFixed( spring.springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } ]
      } );

    var appliedForceControl = new AppliedForceControl( StringUtils.format( appliedForceNumberString, options.number ),
      spring.appliedForceProperty, spring.appliedForceRange );

    var verticalSeparator = new VSeparator( Math.max( springConstantControl.height, appliedForceControl.height ) );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [ springConstantControl, verticalSeparator, appliedForceControl ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SingleSpringControls );
} );
