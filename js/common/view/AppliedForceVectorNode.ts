// Copyright 2015-2022, University of Colorado Boulder

/**
 * AppliedForceVectorNode is the vector representation of applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import ForceVectorNode, { ForceVectorNodeOptions } from './ForceVectorNode.js';

type SelfOptions = EmptySelfOptions;

type AppliedForceVectorNodeOptions = SelfOptions & ForceVectorNodeOptions;

export default class AppliedForceVectorNode extends ForceVectorNode {

  public constructor( appliedForceProperty: TReadOnlyProperty<number>,
                      valueVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: AppliedForceVectorNodeOptions ) {

    const options = optionize<AppliedForceVectorNodeOptions, SelfOptions, ForceVectorNodeOptions>()( {

      // ForceVectorNodeOptions
      fill: HookesLawColors.APPLIED_FORCE,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES
    }, providedOptions );

    super( appliedForceProperty, valueVisibleProperty, options );
  }
}

hookesLaw.register( 'AppliedForceVectorNode', AppliedForceVectorNode );