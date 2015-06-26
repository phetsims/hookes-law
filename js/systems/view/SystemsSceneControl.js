// Copyright 2002-2015, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
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
   * @param {Property.<string>} seriesParallelProperty - switches between 2 systems, 'series'|'parallel'
   * @param {Object} [options]
   * @constructor
   */
  function SystemsSceneControl( seriesParallelProperty, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 10,
      buttonContentYMargin: 5,
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6,
      baseColor: HookesLawQueryParameters.SCENE_SELECTION_COLOR
    }, options );

    RadioButtonGroup.call( this, seriesParallelProperty, [
      { value: 'parallel', node: IconFactory.createParallelSystemIcon() },
      { value: 'series', node: IconFactory.createSeriesSystemIcon() }
    ], options );
  }

  return inherit( RadioButtonGroup, SystemsSceneControl );
} );
