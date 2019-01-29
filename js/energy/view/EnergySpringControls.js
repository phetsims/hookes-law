// Copyright 2015-2018, University of Colorado Boulder

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
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var SpringConstantControl = require( 'HOOKES_LAW/common/view/SpringConstantControl' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var SPRING_PANEL_OPTIONS = HookesLawConstants.SPRING_PANEL_OPTIONS;

  /**
   * @param {Spring} spring
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function EnergySpringControls( spring, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {

      // HBox options
      spacing: 10,
      tandem: Tandem.required
    }, options );

    // Tandems for Panels that contain the controls
    var springConstantPanelTandem = options.tandem.createTandem( 'springConstantPanel' );
    var displacementPanelTandem = options.tandem.createTandem( 'displacementPanel' );

    var springConstantMajorTickValues = [];
    for ( var value = spring.springConstantRange.min; value <= spring.springConstantRange.max; value += 100 ) {
      springConstantMajorTickValues.push( value );
    }

    var springConstantControl = new SpringConstantControl( spring.springConstantProperty, spring.springConstantRange, {
      sliderOptions: {
        minorTickSpacing: 50,
        majorTickValues: springConstantMajorTickValues
      },
      tandem: springConstantPanelTandem.createTandem( 'springConstantControl' )
    } );

    var displacementControl = new DisplacementControl( spring.displacementProperty, spring.displacementRange, numberOfInteractionsInProgressProperty, {
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
      new Panel( springConstantControl, _.extend( { tandem: springConstantPanelTandem }, SPRING_PANEL_OPTIONS ) ),
      new Panel( displacementControl, _.extend( { tandem: displacementPanelTandem }, SPRING_PANEL_OPTIONS ) )
    ];

    HBox.call( this, options );
  }

  hookesLaw.register( 'EnergySpringControls', EnergySpringControls );

  return inherit( HBox, EnergySpringControls );
} );
