// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var SystemsModel = require( 'HOOKES_LAW/systems/model/SystemsModel' );
  var SystemsView = require( 'HOOKES_LAW/systems/view/SystemsView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var systemsString = require( 'string!HOOKES_LAW/systems' );

  //TODO design: what does the screen icon look like?
  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'green' } );
  };

  /**
   * @constructor
   */
  function SystemsScreen() {

    // Scale up for the view
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, HookesLawConstants.UNIT_DISPLACEMENT_VECTOR_LENGTH );

    Screen.call( this,
      systemsString,
      createIcon(),
      function() { return new SystemsModel(); },
      function( model ) { return new SystemsView( model, modelViewTransform ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, SystemsScreen );
} );