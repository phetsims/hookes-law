// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls how many systems are visible on the screen.
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
  var oneSystemIcon = require( 'image!HOOKES_LAW/one-system-icon.png' );
  var twoSystemsIcon = require( 'image!HOOKES_LAW/two-systems-icon.png' );

  /**
   * @param {Property.<number>} numberOfSystemsProperty
   * @param {Object} [options]
   * @constructor
   */
  function NumberOfSystemsControl( numberOfSystemsProperty, options ) {

    options = _.extend( {
      scale: 0.75, //TODO scale image files
      orientation: 'horizontal',
      deselectedButtonOpacity: 0.6,
      deselectedContentOpacity: 0.6
    }, options );

    RadioButtonGroup.call( this, numberOfSystemsProperty, [
      { value: 1, node: new Image( oneSystemIcon ) },
      { value: 2, node: new Image( twoSystemsIcon ) }
    ], options );
  }

  return inherit( RadioButtonGroup, NumberOfSystemsControl );
} );
