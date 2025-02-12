// Copyright 2015-2025, University of Colorado Boulder

/**
 * Vertical dashed line that denotes the equilibrium position of a spring or system of springs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Line, { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import { NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

type SelfOptions = EmptySelfOptions;

// No PhET-iO instrumentation, see https://github.com/phetsims/hookes-law/issues/111.
type EquilibriumPositionNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<LineOptions, 'visibleProperty'>;

export default class EquilibriumPositionNode extends Line {

  public constructor( length: number, providedOptions?: EquilibriumPositionNodeOptions ) {

    const options = optionize<EquilibriumPositionNodeOptions, SelfOptions, LineOptions>()( {

      // LineOptions
      stroke: HookesLawColors.equilibriumPositionColorProperty,
      lineWidth: 2,
      lineDash: [ 3, 3 ]
    }, providedOptions );

    super( 0, 0, 0, length, options );
  }
}

hookesLaw.register( 'EquilibriumPositionNode', EquilibriumPositionNode );