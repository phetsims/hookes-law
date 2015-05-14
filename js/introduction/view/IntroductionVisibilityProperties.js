// Copyright 2002-2015, University of Colorado Boulder

/**
 * Properties that are specific to visibility of things in the "Introduction" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function IntroductionVisibilityProperties() {

    // to make development easier
    var checked = HookesLawQueryParameters.DEV ? true : false;

    PropertySet.call( this, {
      appliedForceVectorVisible: checked, // {boolean} is the applied force vector visible?
      springForceVectorVisible: checked, // {boolean} is the spring force vector visible?
      displacementVectorVisible: checked, // {boolean} is the displacement vector visible?
      equilibriumPositionVisible: checked, // {boolean} is the equilibrium position visible?
      valuesVisible: checked  // {boolean} are numeric values visible?
    } );
  }

  return inherit( PropertySet, IntroductionVisibilityProperties );
} );