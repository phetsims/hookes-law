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
  var Node = require( 'SCENERY/nodes/Node' );
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
      paths: 1, // {number} 1 = single path, 2 = separate front and back paths
      frontStroke: 'black',
      backStroke: 'black',
      loops: 10, // {number} number of loops in the coil
      pointsPerLoop: 50, // {number} number of points used to approximate each loop
      phase: 0, //TODO describe this, add a control?
      amplitude: 50 //TODO describe this, add a control?
    }, options );
    assert && assert( options.paths === 1 || options.paths === 2 );

    Node.call( this );

    // frontPath is also the sole path when options.paths === 1
    var frontPath = new Path( null, {
      stroke: options.frontStroke
    } );
    this.addChild( frontPath );

    var backPath = new Path( null, {
      stroke: options.backStroke
    } );
    if ( options.paths === 2 ) {
      this.addChild( backPath );
    }

    var arrayLength = options.loops * options.pointsPerLoop;
    var index;

    // Update the spring geometry
    Property.multilink( [ model.pitchSizeProperty, model.deltaPhaseProperty, model.aspectRatioProperty ],
      function( pitchSize, deltaPhase, aspectRatio ) {

        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = options.amplitude * Math.cos( 2 * Math.PI * index / options.pointsPerLoop + options.phase ) + pitchSize * (index / options.pointsPerLoop) * options.amplitude;
          var yCoordinate = aspectRatio * options.amplitude * Math.cos( 2 * Math.PI * index / options.pointsPerLoop + deltaPhase + options.phase );
          arrayPosition.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        if ( options.paths === 1 ) {
          // one path for spring
          frontPath.shape = new Shape();
          frontPath.shape.moveToPoint( arrayPosition[ 0 ] );
          for ( index = 1; index < arrayLength; index++ ) {
            frontPath.shape.lineToPoint( arrayPosition[ index ] );
          }
        }
        else {
          // separate front and back for spring
          frontPath.shape = new Shape();
          backPath.shape = new Shape();
          frontPath.shape.moveToPoint( arrayPosition[ 0 ] );
          backPath.shape.moveToPoint( arrayPosition[ 0 ] );
          var wasFront = true;
          for ( index = 1; index < arrayLength; index++ ) {

            var isFront = ( ( 2 * Math.PI * index / options.pointsPerLoop + options.phase + deltaPhase ) % ( 2 * Math.PI ) < Math.PI );

            if ( !wasFront && isFront ) {
              wasFront = true;
              frontPath.shape.moveToPoint( arrayPosition[ index - 1 ] );
            }

            if ( wasFront && !isFront ) {
              wasFront = false;
              backPath.shape.moveToPoint( arrayPosition[ index - 1 ] );
            }

            if ( !wasFront && !isFront ) {
              backPath.shape.lineToPoint( arrayPosition[ index ] );
            }

            if ( wasFront && isFront ) {
              frontPath.shape.lineToPoint( arrayPosition[ index ] );
            }
          }
        }
      } );

    // Update the line width
    model.lineWidthProperty.link( function( lineWidth ) {
      frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    this.mutate( options );
  }

  return inherit( Node, ParametricSpringNode );
} );
