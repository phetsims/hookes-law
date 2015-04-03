// Copyright 2002-2015, University of Colorado Boulder

/**
 * Properties that are specific to the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function ViewProperties() {
    PropertySet.call( this, {
      appliedForceVectorVisible: false,
      springForceVectorVisible: false,
      displacementVectorVisible: false,
      equilibriumPositionVisible: false,
      valuesVisible: false
    } );
  }

  return inherit( PropertySet, ViewProperties );
} );
