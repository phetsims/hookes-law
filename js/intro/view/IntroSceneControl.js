// Copyright 2015, University of Colorado Boulder

/**
 * Scene control for the "Intro" screen, switches between 1 and 2 systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
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
      selectedLineWidth: 2
    }, options );

    RadioButtonGroup.call( this, numberOfSystemsProperty, [
      { value: 1, node: HookesLawIconFactory.createSingleSpringIcon() },
      { value: 2, node: HookesLawIconFactory.createTwoSpringsIcon() }
    ], options );
  }

  return inherit( RadioButtonGroup, IntroSceneControl );
} );
