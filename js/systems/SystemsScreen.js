// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SystemsModel = require( 'HOOKES_LAW/systems/model/SystemsModel' );
  var SystemsView = require( 'HOOKES_LAW/systems/view/SystemsView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var systemsString = require( 'string!HOOKES_LAW/systems' );

  // images
  var systemsScreenImage = require( 'image!HOOKES_LAW/systems-screen.png' );

  /**
   * @constructor
   */
  function SystemsScreen() {
    Screen.call( this,
      systemsString,
      new Image( systemsScreenImage ),
      function() { return new SystemsModel(); },
      function( model ) { return new SystemsView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, SystemsScreen );
} );