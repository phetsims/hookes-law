// Copyright 2015-2018, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {StringProperty} seriesParallelProperty - switches between 2 systems, 'series'|'parallel'
   * @param {Object} [options]
   * @constructor
   */
  function SystemsSceneControl( seriesParallelProperty, options ) {

    options = _.extend( {

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
