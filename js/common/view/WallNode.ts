// Copyright 2015-2022, University of Colorado Boulder

/**
 * The vertical wall that springs are attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ShadedRectangle, { ShadedRectangleOptions } from '../../../../scenery-phet/js/ShadedRectangle.js';
import { NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

type SelfOptions = EmptySelfOptions;

type WallNodeOptions = SelfOptions & NodeTranslationOptions;

export default class WallNode extends ShadedRectangle {

  public constructor( size: Dimension2, providedOptions?: WallNodeOptions ) {

    const options = optionize<WallNodeOptions, SelfOptions, ShadedRectangleOptions>()( {
      baseColor: HookesLawColors.WALL_FILL,
      cornerRadius: 6
    }, providedOptions );

    super( new Bounds2( 0, 0, size.width, size.height ), options );
  }
}

hookesLaw.register( 'WallNode', WallNode );