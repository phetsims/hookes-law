// Copyright 2015-2019, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {StringProperty} seriesParallelProperty - switches between 2 systems, 'series'|'parallel'
   * @param {Object} [options]
   * @constructor
   */
  function SystemsSceneControl( seriesParallelProperty, options ) {

    options = merge( {

      // RadioButtonGroup options
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 5,
      buttonContentYMargin: 5,
      selectedLineWidth: 2,

      // phet-io
      tandem: Tandem.required
    }, options );

    RadioButtonGroup.call( this, seriesParallelProperty, [
      { value: 'parallel', node: HookesLawIconFactory.createParallelSystemIcon(), tandemName: 'parallelRadioButton' },
      { value: 'series', node: HookesLawIconFactory.createSeriesSystemIcon(), tandemName: 'seriesRadioButton' }
    ], options );
  }

  hookesLaw.register( 'SystemsSceneControl', SystemsSceneControl );

  return inherit( RadioButtonGroup, SystemsSceneControl );
} );
