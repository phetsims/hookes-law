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
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var topSpringString = require( 'string!HOOKES_LAW/topSpring' );
  var bottomSpringString = require( 'string!HOOKES_LAW/bottomSpring' );

  // constants
  var SPRING_CONSTANT_TRACK_SIZE = new Dimension2( 120, 3 );
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };

  /**
   * @param {ParallelSystem} system
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSpringControls( system, options ) {

    options = _.extend( {
      number: 1,
      xMargin: 20,
      yMargin: 5,
      fill: HookesLawColors.CONTROL_PANEL_FILL
    }, options );

    var topSpring = system.topSpring;
    var topSpringConstantControl = new SpringConstantControl( topSpringString,
      system.topSpring.springConstantProperty, system.topSpring.springConstantRange, {
        thumbFillEnabled: HookesLawColors.TOP_SPRING_FORCE,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTicks: [ {
          // min
          value: topSpring.springConstantRange.min,
          label: new Text( Util.toFixed( topSpring.springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // halfway between min and max
          value: topSpring.springConstantRange.min + ( topSpring.springConstantRange.max - topSpring.springConstantRange.min ) / 2,
          label: new Text( Util.toFixed( topSpring.springConstantRange.min + ( topSpring.springConstantRange.max - topSpring.springConstantRange.min ) / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // max
          value: topSpring.springConstantRange.max,
          label: new Text( Util.toFixed( topSpring.springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } ]
      } );

    var bottomSpring = system.bottomSpring;
    var bottomSpringConstantControl = new SpringConstantControl( bottomSpringString,
      system.bottomSpring.springConstantProperty, system.bottomSpring.springConstantRange, {
        thumbFillEnabled: HookesLawColors.BOTTOM_SPRING_FORCE,
        trackSize: SPRING_CONSTANT_TRACK_SIZE,
        majorTicks: [ {
          // min
          value: bottomSpring.springConstantRange.min,
          label: new Text( Util.toFixed( bottomSpring.springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // halfway between min and max
          value: bottomSpring.springConstantRange.min + ( bottomSpring.springConstantRange.max - bottomSpring.springConstantRange.min ) / 2,
          label: new Text( Util.toFixed( bottomSpring.springConstantRange.min + ( bottomSpring.springConstantRange.max - bottomSpring.springConstantRange.min ) / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        }, {
          // max
          value: bottomSpring.springConstantRange.max,
          label: new Text( Util.toFixed( bottomSpring.springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } ]
        
      } );

    var springControls = new VBox( {
      spacing: 20,
      resize: false,
      children: [
        topSpringConstantControl,
        new HSeparator( Math.max( topSpringConstantControl.width, bottomSpringConstantControl.width ) ),
        bottomSpringConstantControl
      ]
    } );

    var appliedForceControl = new AppliedForceControl( appliedForceColonString,
      system.equivalentSpring.appliedForceProperty, system.equivalentSpring.appliedForceRange );

    var content = new HBox( {
      spacing: 20,
      resize: false,
      children: [ springControls, new VSeparator( springControls.height ), appliedForceControl ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ParallelSpringControls );
} );
