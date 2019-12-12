// Copyright 2015-2019, University of Colorado Boulder

/**
 * Spring controls for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DisplacementControl = require( 'HOOKES_LAW/common/view/DisplacementControl' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {Spring} spring
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function EnergySpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = merge( {

      // HBox options
      spacing: 10,
      tandem: Tandem.REQUIRED
    }, options );

    // Tandems for Panels that contain the controls
    const springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    const displacementPanelTandem = options.tandem.createTandem( 'displacementPanel' );

    const springConstantMajorTickValues = [];
    for ( let value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      springConstantMajorTickValues.push( value );
    }

    const springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      sliderOptions: {
        minorTickSpacing: 50,
        majorTickValues: springConstantMajorTickValues
      },
      tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
    } );

    const displacementControl = new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgressProperty, {
      sliderOptions: {
        minorTickSpacing: spring.displacementRange.getLength() / 10,
        majorTickValues: [
          spring.displacementRange.min,
          spring.displacementRange.getCenter(),
          spring.displacementRange.max
        ]
      },
      tandem: displacementPanelTandem.createTandem( 'displacementControl' )
    } );

    assert && assert( !options.children, 'EnergySpringControls sets children' );

    options.children = [
      new Panel( springConstantControl, merge( { tandem: springConstantPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( displacementControl, merge( { tandem: displacementPanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    HBox.call( this, options );
  }

  hookesLaw.register( 'EnergySpringControls', EnergySpringControls );

  return inherit( HBox, EnergySpringControls );
} );
