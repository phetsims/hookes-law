// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls the configuration of the springs, selects between parallel and series.
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
  var parallelIcon = require( 'image!HOOKES_LAW/two-systems-icon.png' );
  var seriesIcon = require( 'image!HOOKES_LAW/one-system-icon.png' );

  /**
   * @param {Property.<string>} springConfigurationProperty 'parallel' or 'series'
   * @param {Object} [options]
   * @constructor
   */
  function SpringConfigurationControl( springConfigurationProperty, options ) {

    options = _.extend( {
      scale: 0.75, //TODO scale image files
      orientation: 'horizontal',
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6
    }, options );

    RadioButtonGroup.call( this, springConfigurationProperty, [
      { value: 'parallel', node: new Image( parallelIcon ) },
      { value: 'series', node: new Image( seriesIcon ) },
    ], options );
  }

  return inherit( RadioButtonGroup, SpringConfigurationControl );
} );
