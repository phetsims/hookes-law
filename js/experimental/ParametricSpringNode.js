// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring described by a parametric equation.
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ExperimentalModel} model
   * @param {Object} [options]
   * @constructor
   */
  function ParametricSpringNode( model, options ) {

    options = _.extend( {
      stroke: 'black'
    }, options );

    var thisNode = this;
    Path.call( this, null );

    var loops = 10;
    var pointsPerLoop = 50;
    var arrayLength = loops * pointsPerLoop;
    var phase = 0;
    var amplitude = 50;
    var index;

    // Update the spring path
    Property.multilink( [ model.pitchSizeProperty, model.deltaPhaseProperty, model.aspectRatioProperty ],
      function( pitchSize, deltaPhase, aspectRatio ) {

        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + pitchSize * (index / pointsPerLoop) * amplitude;
          var yCoordinate = aspectRatio * amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          arrayPosition.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        thisNode.shape = new Shape();
        thisNode.shape.moveToPoint( arrayPosition[ 0 ] );
        for ( index = 1; index < arrayLength; index++ ) {
          thisNode.shape.lineToPoint( arrayPosition[ index ] );
        }
      } );

    // Update the line width
    model.lineWidthProperty.link( function( lineWidth ) {
      thisNode.lineWidth = lineWidth;
    } );

    this.mutate( options );
  }

  return inherit( Path, ParametricSpringNode );
} );
