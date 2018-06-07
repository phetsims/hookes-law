// Copyright 2015, University of Colorado Boulder

/**
 * Vertical dashed line that denotes the equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {number} length
   * @param {Object} [options]
   * @constructor
   */
  function EquilibriumPositionNode( length, options ) {

    options = _.extend( {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      tandem: Tandem.required
    }, options );

    Line.call( this, 0, 0, 0, length, options );
  }

  hookesLaw.register( 'EquilibriumPositionNode', EquilibriumPositionNode );

  return inherit( Line, EquilibriumPositionNode );
} );
