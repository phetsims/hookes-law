// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for spring constant.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var springConstantString = require( 'string!HOOKES_LAW/springConstant' );
  var smallString = require( 'string!HOOKES_LAW/small' );
  var largeString = require( 'string!HOOKES_LAW/large' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };
  var MINOR_TICK_SPACING = 5;

  /**
   * @param {Property.<boolean>} springConstantProperty
   * @param {Range} springConstantRange
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( springConstantProperty, springConstantRange, options ) {

    options = _.extend( {
      title: springConstantString,
      align: 'center',
      spacing: 10
    }, options );

    this.titleNode = new Text( options.title, { font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT } ); // @private

    var slider = new HSlider( springConstantProperty, springConstantRange, {
      trackSize: HookesLawConstants.SLIDER_TRACK_SIZE,
      thumbSize: HookesLawConstants.SLIDER_THUMB_SIZE,
      majorTickLength: HookesLawConstants.SLIDER_MAJOR_TICK_LENGTH,
      thumbFillEnabled: HookesLawColors.SPRING_FORCE_VECTOR,
      thumbFillHighlighted: HookesLawColors.SPRING_FORCE_VECTOR.brighterColor()
    } );
    slider.addMajorTick( springConstantRange.min, new Text( smallString, MAJOR_TICK_LABEL_OPTIONS ) );
    slider.addMajorTick( springConstantRange.max, new Text( largeString, MAJOR_TICK_LABEL_OPTIONS ) );
    for ( var i = springConstantRange.min + MINOR_TICK_SPACING; i < springConstantRange.max; ) {
      slider.addMinorTick( i );
      i += MINOR_TICK_SPACING;
    }

    options.resize = false; // workaround for slider
    options.children = [
      this.titleNode,
      slider
    ];
    VBox.call( this, options );
  }

  return inherit( VBox, SpringConstantControl, {

    setTitle: function( title ) {
      this.titleNode.text = title;
    },
    set title( value ) { this.setTitle( value ); },

    getTitle: function() {
      return this.titleNode.text;
    },
    get title() { return this.getTitle(); }

  } );
} );
