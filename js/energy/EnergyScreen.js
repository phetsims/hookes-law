// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyModel = require( 'HOOKES_LAW/energy/model/EnergyModel' );
  var EnergyView = require( 'HOOKES_LAW/energy/view/EnergyView' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );

  //TODO design: what does the screen icon look like?
  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'yellow' } );
  };

  /**
   * @constructor
   */
  function IntroductionScreen() {

     // Scale up for the view
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, HookesLawConstants.UNIT_DISPLACEMENT_VECTOR_LENGTH );

    Screen.call( this,
      energyString,
      createIcon(),
      function() { return new EnergyModel(); },
      function( model ) { return new EnergyView( model, modelViewTransform ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );