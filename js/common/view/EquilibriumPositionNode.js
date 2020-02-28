// Copyright 2015-2020, University of Colorado Boulder

/**
 * Vertical dashed line that denotes the equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

/**
 * @param {number} length
 * @param {Object} [options]
 * @constructor
 */
function EquilibriumPositionNode( length, options ) {

  options = merge( {
    stroke: HookesLawColors.EQUILIBRIUM_POSITION,
    lineWidth: 2,
    lineDash: [ 3, 3 ],
    tandem: Tandem.OPTIONAL // because this node is used to create icons
  }, options );

  Line.call( this, 0, 0, 0, length, options );
}

hookesLaw.register( 'EquilibriumPositionNode', EquilibriumPositionNode );

inherit( Line, EquilibriumPositionNode );
export default EquilibriumPositionNode;