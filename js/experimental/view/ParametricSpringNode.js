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
      loops: 10, // {number} number of loops in the coil
      stroke: 'black', // {string|Color} stroke single-path spring
      frontStroke: 'lightBlue', // {string|Color} stroke for the front path when using 2 paths
      backStroke: 'blue' // {string|Color} stroke for the back path when using 2 paths
    }, options );
    assert && assert( options.paths === 1 || options.paths === 2 );

    Node.call( this );

    var backPath = new Path( null, { stroke: options.backStroke } );
    this.addChild( backPath );

    // frontPath is also the sole path when !model.frontAndBackProperty.get()
    var frontPath = new Path( null );
    this.addChild( frontPath );

    // Update the spring geometry
    Property.multilink( [ model.radiusProperty, model.aspectRatioProperty, model.pointsPerLoopProperty,
        model.phaseProperty, model.deltaPhaseProperty, model.pitchSizeProperty, model.frontAndBackProperty ],
      function( radius, aspectRatio, pointsPerLoop, phase, deltaPhase, pitchSize, frontAndBack ) {

        var arrayLength = options.loops * pointsPerLoop;
        var index;

        //TODO expand doc for the parametric equation, add a reference
        // compute the points
        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + pitchSize * (index / pointsPerLoop) * radius;
          var yCoordinate = aspectRatio * radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          arrayPosition.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        if ( !frontAndBack ) {
          // one path
          frontPath.shape = new Shape();
          frontPath.shape.moveToPoint( arrayPosition[ 0 ] );
          for ( index = 1; index < arrayLength; index++ ) {
            frontPath.shape.lineToPoint( arrayPosition[ index ] );
          }
        }
        else {
          // separate paths for front and back
          frontPath.shape = new Shape();
          backPath.shape = new Shape();
          frontPath.shape.moveToPoint( arrayPosition[ 0 ] );
          backPath.shape.moveToPoint( arrayPosition[ 0 ] );
          var wasFront = true; // was the previous point on the front path?
          for ( index = 1; index < arrayLength; index++ ) {

            // is the current point on the front path?
            var isFront = ( ( 2 * Math.PI * index / pointsPerLoop + phase + deltaPhase ) % ( 2 * Math.PI ) < Math.PI );

            if ( isFront ) {
              // we're in the front
              if ( !wasFront ) {
                // ... and we've just moved to the front
                frontPath.shape.moveToPoint( arrayPosition[ index - 1 ] );
              }
              frontPath.shape.lineToPoint( arrayPosition[ index ] );
            }
            else {
              // we're in the back
              if ( wasFront ) {
                // ... and we've just moved to the back
                backPath.shape.moveToPoint( arrayPosition[ index - 1 ] );
              }
              backPath.shape.lineToPoint( arrayPosition[ index ] );
            }

            wasFront = isFront;
          }
        }
      } );

    model.frontAndBackProperty.link( function( frontAndBack ) {
      frontPath.stroke = frontAndBack ? options.frontStroke : options.stroke;
      backPath.visible = frontAndBack;
    } );

    //TODO Why does SVGGroup.js fail at line 189 when this is moved before Property.multilink above?
    //TODO Error: Invalid value for <g> attribute transform="translate(-Infinity,0.00000000000000000000)"
    // Update the line width
    model.lineWidthProperty.link( function( lineWidth ) {
      frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    this.mutate( options );
  }

  return inherit( Node, ParametricSpringNode );
} );
