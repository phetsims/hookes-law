// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring described by a parametric equation. This implementation is a variation of the cycloid equation.
 * A prolate cycloid (see http://mathworld.wolfram.com/ProlateCycloid.html) comes closest to this implementation,
 * although it doesn't include aspect ratio and delta phase.
 *
 * The front and back of the spring are drawn as separate paths to provide pseudo-3D visual cues.
 *
 * The "Experimental" screen provides an extensive test harness for ParametricSpringNode.
 * Run with query parameter "exp" to add the "Experimental" screen to the sim.
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ParametricSpringNode( options ) {

    options = _.extend( {
      lineCap: 'square',
      // {Color|string} colors used for the gradient strokes. middleColor is the dominant color.
      frontColor: 'lightGray',
      middleColor: 'gray',
      backColor: 'black',
      // {number} length of the horizontal line added to the left end of the coil
      leftEndLength: 15,
      // {number} length of the horizontal line added to the right end of the coil
      rightEndLength: 25,
      // {number} number of loops in the spring
      loops: 10,
      // {number} radius of a loop with aspect ratio of 1:1
      radius: 10,
      // {number} y:x aspect ratio of the loop radius
      aspectRatio: 4,
      // {number} number of points used to approximate 1 loop
      pointsPerLoop: 30,
      // {number} lineWidth used to draw the coil
      lineWidth: 3,
      // {number} phase angle of where the loop starts, period is (0,2*PI) radians, counterclockwise
      phase: Math.PI,
      // {number} responsible for the leaning of the spring, variation on a Lissjoue curve, period is (0,2*PI) radians
      deltaPhase: Math.PI / 2,
      // {number} multiplier for radius in the x dimensions, makes the spring appear to get longer
      xScale: 2.5
    }, options );

    this.model = new PropertySet( {
      loops: options.loops,
      radius: options.radius,
      aspectRatio: options.aspectRatio,
      pointsPerLoop: options.pointsPerLoop,
      lineWidth: options.lineWidth,
      phase: options.phase,
      deltaPhase: options.deltaPhase,
      xScale: options.xScale
    }, options );

    var frontPath = new Path( null, { lineCap: options.lineCap } );
    var backPath = new Path( null, { lineCap: options.lineCap } );

    // Update the line width
    this.model.lineWidthProperty.link( function( lineWidth ) {
      frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    // Update the shapes
    Property.multilink( [
        this.model.loopsProperty, this.model.radiusProperty,
        this.model.aspectRatioProperty, this.model.pointsPerLoopProperty,
        this.model.phaseProperty, this.model.deltaPhaseProperty,
        this.model.xScaleProperty
      ],
      function( loops, radius, aspectRatio, pointsPerLoop, phase, deltaPhase, xScale ) {

        var numberOfPoints = loops * pointsPerLoop + 1;
        var index;

        // compute the points
        var points = []; // {Vector2[]}
        for ( index = 0; index < numberOfPoints; index++ ) {
          var xCoordinate = radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + xScale * (index / pointsPerLoop) * radius;
          var yCoordinate = aspectRatio * radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          points.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        var frontShape = new Shape();
        var backShape = new Shape();
        var wasFront = true; // was the previous point on the front path?
        for ( index = 0; index < numberOfPoints; index++ ) {

          // is the current point on the front path?
          var isFront = ( ( 2 * Math.PI * index / pointsPerLoop + phase + deltaPhase ) % ( 2 * Math.PI ) > Math.PI );

          // horizontal line at left end
          if ( index === 0 ) {
            if ( isFront ) {
              frontShape.moveTo( points[ 0 ].x - options.leftEndLength, points[ 0 ].y );
            }
            else {
              backShape.moveTo( points[ 0 ].x - options.leftEndLength, points[ 0 ].y );
            }
          }

          if ( isFront ) {
            // we're in the front
            if ( !wasFront && index !== 0 ) {
              // ... and we've just moved to the front
              frontShape.moveToPoint( points[ index - 1 ] );
            }
            frontShape.lineToPoint( points[ index ] );
          }
          else {
            // we're in the back
            if ( wasFront && index !== 0 ) {
              // ... and we've just moved to the back
              backShape.moveToPoint( points[ index - 1 ] );
            }
            backShape.lineToPoint( points[ index ] );
          }

          wasFront = isFront;
        }

        // horizontal line at right end
        if ( wasFront ) {
          frontShape.lineTo( points[ numberOfPoints - 1 ].x + options.rightEndLength, points[ numberOfPoints - 1 ].y );
        }
        else {
          backShape.lineTo( points[ numberOfPoints - 1 ].x + options.rightEndLength, points[ numberOfPoints - 1 ].y );
        }

        frontPath.shape = frontShape;
        backPath.shape = backShape;
      } );

    // Update the stroke gradients
    Property.multilink( [ this.model.radiusProperty, this.model.aspectRatioProperty ],
      function( radius, aspectRatio ) {

        var yRadius = radius * aspectRatio;

        frontPath.stroke = new LinearGradient( 0, -yRadius, 0, yRadius )
          .addColorStop( 0, options.middleColor )
          .addColorStop( 0.35, options.frontColor )
          .addColorStop( 0.65, options.frontColor )
          .addColorStop( 1, options.middleColor );

        backPath.stroke = new LinearGradient( 0, -yRadius, 0, yRadius )
          .addColorStop( 0, options.middleColor )
          .addColorStop( 0.5, options.backColor )
          .addColorStop( 1, options.middleColor );
      } );

    options.children = [ backPath, frontPath ];
    Node.call( this, options );
  }

  return inherit( Node, ParametricSpringNode, {

    reset: function() {
      this.model.reset();
    }
  } );
} )
;
