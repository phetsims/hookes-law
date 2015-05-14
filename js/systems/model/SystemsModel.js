// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function SystemsModel() {
    PropertySet.call( this, {
      seriesParallel: 'parallel' // configuration of the springs, 'series'|'parallel'
    } );
  }

  return inherit( PropertySet, SystemsModel );
} );