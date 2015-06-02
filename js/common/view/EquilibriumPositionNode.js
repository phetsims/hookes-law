// Copyright 2002-2015, University of Colorado Boulder

/**
 * Vertical line used to denote equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );

  /**
   * @param {number} length
   * @param {Object} [options]
   * @constructor
   */
  function EquilibriumPositionNode( length, options ) {

    options = _.extend( {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ]
    }, options );

    Line.call( this, 0, 0, 0, length, options );
  }

  return inherit( Line, EquilibriumPositionNode );
} );
