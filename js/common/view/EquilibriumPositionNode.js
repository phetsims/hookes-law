// Copyright 2015-2019, University of Colorado Boulder

/**
 * Vertical dashed line that denotes the equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Tandem = require( 'TANDEM/Tandem' );

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
      tandem: Tandem.optional // because this node is used to create icons
    }, options );

    Line.call( this, 0, 0, 0, length, options );
  }

  hookesLaw.register( 'EquilibriumPositionNode', EquilibriumPositionNode );

  return inherit( Line, EquilibriumPositionNode );
} );
