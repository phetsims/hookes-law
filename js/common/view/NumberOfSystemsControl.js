// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls how many systems are visible on the screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var RectangularStickyToggleButton = require( 'SUN/buttons/RectangularStickyToggleButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property.<number>} numberOfSystemsProperty
   * @param {Object} [options]
   * @constructor
   */
  function NumberOfSystemsControl( numberOfSystemsProperty, options ) {

    options = _.extend( {
      spacing: 15
    }, options );

    //TODO dump this label
    var titleNode = new Text( 'Systems: ', { font: new HookesLawFont( 20 ) } );

    //TODO replace text with icon
    var oneSystemButton = new RectangularStickyToggleButton( 2, 1, numberOfSystemsProperty, {
      content: new Text( 1, { font: new HookesLawFont( 20 ) } )
    } );

    //TODO replace text with icon
    var twoSystemsButton = new RectangularStickyToggleButton( 1, 2, numberOfSystemsProperty, {
      content: new Text( 2, { font: new HookesLawFont( 20 ) } )
    } );

    options.children = [ titleNode, oneSystemButton, twoSystemsButton ];
    HBox.call( this, options );
  }

  return inherit( HBox, NumberOfSystemsControl );
} );
