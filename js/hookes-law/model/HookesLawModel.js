//  Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Main constructor for HookesLawModel, which contains all of the model logic for the entire sim screen.
   * @constructor
   */
  function HookesLawModel() {

    PropertySet.call( this, {} );
  }

  return inherit( PropertySet, HookesLawModel, {

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function( dt ) {
      // Handle model animation here.
    }
  } );
} );