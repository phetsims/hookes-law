// Copyright 2015-2019, University of Colorado Boulder

/**
 * Vector representation of spring force (-F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import ForceVectorNode from './ForceVectorNode.js';

/**
 * @param {NumberProperty} springForceProperty units = N
 * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
 * @param {Object} [options]
 * @constructor
 */
function SpringForceVectorNode( springForceProperty, valueVisibleProperty, options ) {

  options = merge( {
    fill: HookesLawColors.SINGLE_SPRING,
    decimalPlaces: HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES,
    alignZero: 'right', // AppliedForceVectorNode use 'left', so we use 'right' so that '0' values won't overlap
    tandem: Tandem.REQUIRED
  }, options );

  ForceVectorNode.call( this, springForceProperty, valueVisibleProperty, options );
}

hookesLaw.register( 'SpringForceVectorNode', SpringForceVectorNode );

inherit( ForceVectorNode, SpringForceVectorNode );
export default SpringForceVectorNode;