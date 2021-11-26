// Copyright 2015-2020, University of Colorado Boulder

/**
 * The "nib" is the little piece attached to the right end of a spring that is grabbed
 * by the robotic arm's pincers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';

class NibNode extends Rectangle {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'black',
      width: 10,
      height: 8
    }, options );

    super( 0, 0, options.width, options.height, 2, 2, options );
  }
}

hookesLaw.register( 'NibNode', NibNode );

export default NibNode;