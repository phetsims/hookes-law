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
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var leftSpringString = require( 'string!HOOKES_LAW/leftSpring' );
  var rightSpringString = require( 'string!HOOKES_LAW/rightSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };

  /**
   * @param {SeriesSystem} system
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSpringControls( system, options ) {

    options = _.extend( {
      number: 1,
      xMargin: 20,
      yMargin: 5,
      fill: HookesLawColors.CONTROL_PANEL_FILL
    }, options );

    var leftSpring = system.leftSpring;
    var leftSpringConstantControl = new SpringConstantControl( leftSpringString,
      leftSpring.springConstantProperty, leftSpring.springConstantRange, {
        thumbFillEnabled: HookesLawColors.LEFT_SPRING_FORCE,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTicks: [ {
          // min
          value: leftSpring.springConstantRange.min,
          label: new Text( Util.toFixed( leftSpring.springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // halfway between min and max
          value: leftSpring.springConstantRange.min + ( leftSpring.springConstantRange.max - leftSpring.springConstantRange.min ) / 2,
          label: new Text( Util.toFixed( leftSpring.springConstantRange.min + ( leftSpring.springConstantRange.max - leftSpring.springConstantRange.min ) / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // max
          value: leftSpring.springConstantRange.max,
          label: new Text( Util.toFixed( leftSpring.springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } ]
      } );

    var rightSpring = system.rightSpring;
    var rightSpringConstantControl = new SpringConstantControl( rightSpringString,
      system.rightSpring.springConstantProperty, system.rightSpring.springConstantRange, {
        thumbFillEnabled: HookesLawColors.RIGHT_SPRING_FORCE,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTicks: [ {
          // min
          value: rightSpring.springConstantRange.min,
          label: new Text( Util.toFixed( rightSpring.springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // halfway between min and max
          value: rightSpring.springConstantRange.min + ( rightSpring.springConstantRange.max - rightSpring.springConstantRange.min ) / 2,
          label: new Text( Util.toFixed( rightSpring.springConstantRange.min + ( rightSpring.springConstantRange.max - rightSpring.springConstantRange.min ) / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // max
          value: rightSpring.springConstantRange.max,
          label: new Text( Util.toFixed( rightSpring.springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } ]
      } );

    var appliedForceControl = new AppliedForceControl( appliedForceColonString,
      system.equivalentSpring.appliedForceProperty, system.equivalentSpring.appliedForceRange );

    var separatorHeight = Math.max( Math.max( leftSpringConstantControl.height, rightSpringConstantControl.height ), appliedForceControl.height );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [ leftSpringConstantControl, new VSeparator( separatorHeight ), rightSpringConstantControl, new VSeparator( separatorHeight ), appliedForceControl ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, SeriesSpringControls );
} );
