// Copyright 2002-2015, University of Colorado Boulder

/**
 * Displays the spring force.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ForceVectorNode = require( 'HOOKES_LAW/common/view/ForceVectorNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Property.<number>} springForceProperty
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpringForceVectorNode( springForceProperty, valuesVisibleProperty, options ) {

    options = _.extend( {
      fill: HookesLawColors.TOTAL_SPRING_FORCE,
      decimalPlaces: HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES,
      alignZero: 'right'
    }, options );

    ForceVectorNode.call( this, springForceProperty, valuesVisibleProperty, options );
  }

  return inherit( ForceVectorNode, SpringForceVectorNode );
} );
