// Copyright 2015-2022, University of Colorado Boulder

/**
 * SpringForceVectorNode is the vector representation of spring force (-F).
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

type SpringForceVectorNodeOptions = SelfOptions & ForceVectorNodeOptions;

export default class SpringForceVectorNode extends ForceVectorNode {

  public constructor( springForceProperty: TReadOnlyProperty<number>,
                      valueVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: SpringForceVectorNodeOptions ) {

    const options = optionize<SpringForceVectorNodeOptions, SelfOptions, ForceVectorNodeOptions>()( {

      // ForceVectorNodeOptions
      fill: HookesLawColors.SINGLE_SPRING,
      decimalPlaces: HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES,
      alignZero: 'right' // AppliedForceVectorNode uses 'left', so we use 'right' so that '0' values won't overlap
    }, providedOptions );

    super( springForceProperty, valueVisibleProperty, options );
  }
}

hookesLaw.register( 'SpringForceVectorNode', SpringForceVectorNode );