// Copyright 2015, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
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
   * @param {Property.<string>} seriesParallelProperty - switches between 2 systems, 'series'|'parallel'
   * @param {Object} [options]
   * @constructor
   */
  function SystemsSceneControl( seriesParallelProperty, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 5,
      buttonContentYMargin: 5,
      selectedLineWidth: 2
    }, options );

    RadioButtonGroup.call( this, seriesParallelProperty, [
      { value: 'parallel', node: HookesLawIconFactory.createParallelSystemIcon() },
      { value: 'series', node: HookesLawIconFactory.createSeriesSystemIcon() }
    ], options );
  }

  return inherit( RadioButtonGroup, SystemsSceneControl );
} );
