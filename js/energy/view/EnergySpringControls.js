// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring controls for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DisplacementControl = require( 'HOOKES_LAW/common/view/DisplacementControl' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );

  /**
   * @param {Spring} spring
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function EnergySpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = options || {};

    var majorTickValues = [];
    for ( var value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      majorTickValues.push( value );
    }

    var springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      minorTickSpacing: 50,
      majorTickValues: majorTickValues
    } );

    var displacementControl = new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgressProperty, {
      minorTickSpacing: spring.displacementRange.getLength() / 10,
      majorTickValues: [
        spring.displacementRange.min,
        spring.displacementRange.getCenter(),
        spring.displacementRange.max
      ]
    } );

    options.spacing = 10;
    options.children = [
      new Panel( springConstantControl, HookesLawConstants.SPRING_PANEL_OPTIONS ),
      new Panel( displacementControl, HookesLawConstants.SPRING_PANEL_OPTIONS )
    ];
    HBox.call( this, options );
  }

  return inherit( HBox, EnergySpringControls );
} );
