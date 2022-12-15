// Copyright 2015-2022, University of Colorado Boulder

/**
 * The "nib" is the little piece attached to the right end of a spring that is grabbed
 * by the robotic arm's pincers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { NodeTranslationOptions, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';

type SelfOptions = EmptySelfOptions;

type NibNodeOptions = SelfOptions & NodeTranslationOptions & PickOptional<RectangleOptions, 'fill'>;

export default class NibNode extends Rectangle {

  public constructor( providedOptions?: NibNodeOptions ) {

    const options = optionize<NibNodeOptions, SelfOptions, RectangleOptions>()( {
      fill: 'black',
      cornerRadius: 2
    }, providedOptions );

    super( 0, 0, 10, 8, options );
  }
}

hookesLaw.register( 'NibNode', NibNode );