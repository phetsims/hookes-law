// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls how many systems are visible on the screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  // images
  var singleSpringIcon = require( 'image!HOOKES_LAW/single-spring-scene.png' );
  var twoSpringIcon = require( 'image!HOOKES_LAW/two-spring-scene.png' );

  /**
   * @param {Property.<number>} numberOfSystemsProperty
   * @param {Object} [options]
   * @constructor
   */
  function NumberOfSystemsControl( numberOfSystemsProperty, options ) {

    options = _.extend( {
      scale: 0.4, //TODO scale image files?
      orientation: 'horizontal',
      spacing: 20,
      buttonContentXMargin: 10,
      buttonContentYMargin: 10,
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6,
      baseColor: HookesLawQueryParameters.SCENE_SELECTION_COLOR
    }, options );

    RadioButtonGroup.call( this, numberOfSystemsProperty, [
      { value: 1, node: new Image( singleSpringIcon ) },
      { value: 2, node: new Image( twoSpringIcon ) }
    ], options );
  }

  return inherit( RadioButtonGroup, NumberOfSystemsControl );
} );
