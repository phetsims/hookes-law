// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls of selecting between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );

  // images
  var parallelIcon = require( 'image!HOOKES_LAW/parallel-spring-scene.png' );
  var seriesIcon = require( 'image!HOOKES_LAW/series-spring-scene.png' );

  /**
   * @param {Property.<string>} seriesParallelProperty 'series'|'parallel'
   * @param {Object} [options]
   * @constructor
   */
  function SeriesParallelControl( seriesParallelProperty, options ) {

    options = _.extend( {
      scale: 0.4, //TODO scale image files
      orientation: 'horizontal',
      spacing: 20,
      buttonContentXMargin: 10,
      buttonContentYMargin: 10,
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6
    }, options );

    RadioButtonGroup.call( this, seriesParallelProperty, [
      { value: 'parallel', node: new Image( parallelIcon ) },
      { value: 'series', node: new Image( seriesIcon ) },
    ], options );
  }

  return inherit( RadioButtonGroup, SeriesParallelControl );
} );
