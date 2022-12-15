// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Vector representation of applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import ForceVectorNode from './ForceVectorNode.js';

export default class AppliedForceVectorNode extends ForceVectorNode {

  /**
   * @param {NumberProperty} appliedForceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   */
  constructor( appliedForceProperty, valueVisibleProperty, options ) {

    options = merge( {
      fill: HookesLawColors.APPLIED_FORCE,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      tandem: Tandem.REQUIRED
    }, options );

    super( appliedForceProperty, valueVisibleProperty, options );
  }
}

hookesLaw.register( 'AppliedForceVectorNode', AppliedForceVectorNode );