// Copyright 2002-2015, University of Colorado Boulder

/**
 * Properties that are specific to visibility of things in the view.
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
  function VisibilityProperties() {
    PropertySet.call( this, {
      appliedForceVectorVisible: false, // {boolean} is the applied force vector visible?
      springForceVectorVisible: false, // {boolean} is the spring force vector visible?
      displacementVectorVisible: false, // {boolean} is the displacement vector visible?
      equilibriumPositionVisible: false, // {boolean} is the equilibrium position visible?
      valuesVisible: false  // {boolean} are numeric values visible?
    } );
  }

  return inherit( PropertySet, VisibilityProperties );
} );
