// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring described by a parametric equation, with separate front and back paths, to add depth.
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
  function FrontBackSpringNode( model, options ) {

    var frontPath = new Path( null, {
      stroke: 'lightBlue'
    } );

    var backPath = new Path( null, {
      stroke: 'blue'
    } );

    var loops = 10;
    var pointsPerLoop = 50;
    var arrayLength = loops * pointsPerLoop;
    var phase = 0;
    var amplitude = 50;
    var index;

    // Update the front and back paths
    Property.multilink( [ model.pitchSizeProperty, model.deltaPhaseProperty, model.aspectRatioProperty ],
      function( pitchSize, deltaPhase, aspectRatio ) {

        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + pitchSize * (index / pointsPerLoop) * amplitude;
          var yCoordinate = aspectRatio * amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          arrayPosition.push( new Vector2( xCoordinate, yCoordinate ) );
        }
        frontPath.shape = new Shape();
        backPath.shape = new Shape();

        frontPath.shape.moveToPoint( arrayPosition[ 0 ] );
        backPath.shape.moveToPoint( arrayPosition[ 0 ] );
        var wasFront = true;
        for ( index = 1; index < arrayLength; index++ ) {

          var isFront = ( ( 2 * Math.PI * index / pointsPerLoop + phase + deltaPhase ) % ( 2 * Math.PI ) < Math.PI );

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
      } );

    // Update the line width
    model.lineWidthProperty.link( function( lineWidth ) {
      frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    options.children = [ backPath, frontPath ];
    Node.call( this, options );
  }

  return inherit( Node, FrontBackSpringNode );
} );
