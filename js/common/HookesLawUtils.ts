// Copyright 2025, University of Colorado Boulder

/**
 * Utility functions for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../scenery/js/nodes/Node.js';
import NumberDisplay from '../../../scenery-phet/js/NumberDisplay.js';
import Slider from '../../../sun/js/Slider.js';
import ArrowButton from '../../../sun/js/buttons/ArrowButton.js';
import VBox from '../../../scenery/js/layout/nodes/VBox.js';
import HBox from '../../../scenery/js/layout/nodes/HBox.js';

/**
 * layoutFunction option value to be used with spring-related NumberControls.
 * See https://github.com/phetsims/hookes-law/issues/125.
 */
export function springControlLayoutFunction( titleNode: Node, numberDisplay: NumberDisplay, slider: Slider,
                                             decrementButton: ArrowButton | null, incrementButton: ArrowButton | null ): Node {

  assert && assert( decrementButton, 'decrementButton is required.' );
  assert && assert( incrementButton, 'incrementButton is required.' );

  return new VBox( {
    excludeInvisibleChildrenFromBounds: false,
    align: 'center',
    spacing: 5,
    children: [
      new HBox( {
        spacing: 5,
        children: [ titleNode, numberDisplay ],
        excludeInvisibleChildrenFromBounds: false
      } ),
      new HBox( {
        spacing: 15,
        children: [ decrementButton!, slider, incrementButton! ],
        excludeInvisibleChildrenFromBounds: false
      } )
    ]
  } );
}