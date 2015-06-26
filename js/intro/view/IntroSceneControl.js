// Copyright 2002-2015, University of Colorado Boulder

/**
 * Scene control for the "Intro" screen, switches between 1 and 2 systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var IconFactory = require( 'HOOKES_LAW/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  /**
   * @param {Property.<number>} numberOfSystemsProperty
   * @param {Object} [options]
   * @constructor
   */
  function IntroSceneControl( numberOfSystemsProperty, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 20,
      buttonContentYMargin: 5,
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6,
      baseColor: HookesLawQueryParameters.SCENE_SELECTION_COLOR
    }, options );

    RadioButtonGroup.call( this, numberOfSystemsProperty, [
      { value: 1, node: IconFactory.createSingleSpringIcon() },
      { value: 2, node: IconFactory.createTwoSpringsIcon() }
    ], options );
  }

  return inherit( RadioButtonGroup, IntroSceneControl );
} );
