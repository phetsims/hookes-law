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
   * @param {number} numberOfInteractionsInProgress
   * @param {Object} [options]
   * @constructor
   */
  function EnergySpringControls( spring, numberOfInteractionsInProgress, options ) {

    options = options || {};

    var majorTickValues = [];
    for ( var value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      majorTickValues.push( value );
    }
    var springConstantControlPanel = new Panel(
      new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
        minorTickSpacing: 50,
        majorTickValues: majorTickValues
      } ), HookesLawConstants.SPRING_PANEL_OPTIONS );

    var displacementControlPanel = new Panel(
      new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgress, {
        minorTickSpacing: spring.displacementRange.getLength() / 10,
        majorTickValues: [
          spring.displacementRange.min,
          spring.displacementRange.getCenter(),
          spring.displacementRange.max
        ]
      } ), HookesLawConstants.SPRING_PANEL_OPTIONS );

    options.spacing = 10;
    options.children = [ springConstantControlPanel, displacementControlPanel ];
    HBox.call( this, options );
  }

  return inherit( HBox, EnergySpringControls );
} );
