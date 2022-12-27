// Copyright 2015-2022, University of Colorado Boulder

/**
 * Vertical dashed line that denotes the equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Line, LineOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

type SelfOptions = EmptySelfOptions;

type EquilibriumPositionNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<LineOptions, 'visibleProperty'> & PickRequired<LineOptions, 'tandem'>;

export default class EquilibriumPositionNode extends Line {

  public constructor( length: number, providedOptions: EquilibriumPositionNodeOptions ) {

    const options = optionize<EquilibriumPositionNodeOptions, SelfOptions, LineOptions>()( {

      // LineOptions
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ]
    }, providedOptions );

    super( 0, 0, 0, length, options );
  }
}

hookesLaw.register( 'EquilibriumPositionNode', EquilibriumPositionNode );