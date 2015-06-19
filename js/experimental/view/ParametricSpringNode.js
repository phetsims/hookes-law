// Copyright 2002-2015, University of Colorado Boulder

/**
 * Spring described by a parametric equation.
 * The front and back of are drawn as separate paths to provide pseudo-3D visual cues.
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
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // colors - Note that if using query parameters, the '#' for hex colors needs to be URL encoded as '%23', eg '#CC66FF' -> '%23CC66FF'
  var FRONT_COLOR = phet.chipper.getQueryParameter( 'frontColor' ) || 'rgb( 150, 150, 255 )';
  var MIDDLE_COLOR = phet.chipper.getQueryParameter( 'middleColor' ) || 'rgb( 0, 0, 255 )';
  var BACK_COLOR = phet.chipper.getQueryParameter( 'backColor' ) || 'rgb( 0, 0, 200 )';

  // constants
  var LEFT_END_LENGTH = 15;
  var RIGHT_END_LENGTH = 25;

  /**
   * @param {ParametricSpring} spring
   * @param {Object} [options]
   * @constructor
   */
  function ParametricSpringNode( spring, options ) {

    options = _.extend( {
      lineCap: 'round'
    }, options );

    Node.call( this );

    var backPath = new Path( null, { lineCap: options.lineCap } );
    this.addChild( backPath );

    var frontPath = new Path( null, { lineCap: options.lineCap } );
    this.addChild( frontPath );

    // Update the spring geometry
    Property.multilink( [
        spring.loopsProperty, spring.radiusProperty,
        spring.aspectRatioProperty, spring.pointsPerLoopProperty,
        spring.phaseProperty, spring.deltaPhaseProperty,
        spring.xScaleProperty
      ],
      function( loops, radius, aspectRatio, pointsPerLoop, phase, deltaPhase, xScale ) {

        var numberOfPoints = loops * pointsPerLoop + 1;
        var index;

        //TODO expand doc for the parametric equation, add a reference
        // compute the points
        var points = []; // {Vector2[]}
        for ( index = 0; index < numberOfPoints; index++ ) {
          var xCoordinate = radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + xScale * (index / pointsPerLoop) * radius;
          var yCoordinate = aspectRatio * radius * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          points.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        frontPath.shape = new Shape();
        backPath.shape = new Shape();
        frontPath.shape.moveToPoint( points[ 0 ] );
        backPath.shape.moveToPoint( points[ 0 ] );
        var wasFront = true; // was the previous point on the front path?
        for ( index = 0; index < numberOfPoints; index++ ) {

          // is the current point on the front path?
          var isFront = ( ( 2 * Math.PI * index / pointsPerLoop + phase + deltaPhase ) % ( 2 * Math.PI ) > Math.PI );

          // horizontal line at left end
          if ( index === 0 ) {
            if ( isFront ) {
              frontPath.shape.moveTo( points[ 0 ].x - LEFT_END_LENGTH, points[ 0 ].y );
            }
            else {
              backPath.shape.moveTo( points[ 0 ].x - LEFT_END_LENGTH, points[ 0 ].y );
            }
          }

          if ( isFront ) {
            // we're in the front
            if ( !wasFront && index !== 0 ) {
              // ... and we've just moved to the front
              frontPath.shape.moveToPoint( points[ index - 1 ] );
            }
            frontPath.shape.lineToPoint( points[ index ] );
          }
          else {
            // we're in the back
            if ( wasFront && index !== 0 ) {
              // ... and we've just moved to the back
              backPath.shape.moveToPoint( points[ index - 1 ] );
            }
            backPath.shape.lineToPoint( points[ index ] );
          }

          wasFront = isFront;
        }

        // horizontal line at right end
        if ( wasFront ) {
          frontPath.shape.lineTo( points[ numberOfPoints - 1 ].x + RIGHT_END_LENGTH, points[ numberOfPoints - 1 ].y );
        }
        else {
          backPath.shape.lineTo( points[ numberOfPoints - 1 ].x + RIGHT_END_LENGTH, points[ numberOfPoints - 1 ].y );
        }
      } );

    Property.multilink( [ spring.radiusProperty, spring.aspectRatioProperty ],
      function( radius, aspectRatio ) {
        var yRadius = radius * aspectRatio;
        frontPath.stroke = new LinearGradient( 0, -yRadius, 0, yRadius )
          .addColorStop( 0, MIDDLE_COLOR )
          .addColorStop( 0.35, FRONT_COLOR )
          .addColorStop( 0.65, FRONT_COLOR )
          .addColorStop( 1, MIDDLE_COLOR );
        backPath.stroke = new LinearGradient( 0, -yRadius, 0, yRadius )
          .addColorStop( 0, MIDDLE_COLOR )
          .addColorStop( 0.5, BACK_COLOR )
          .addColorStop( 1, MIDDLE_COLOR );
      } );

    //TODO Why does SVGGroup.js fail at line 189 when this is moved before Property.multilink above?
    //TODO Error: Invalid value for <g> attribute transform="translate(-Infinity,0.00000000000000000000)"
    // Update the line width
    spring.lineWidthProperty.link( function( lineWidth ) {
      frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    this.mutate( options );
  }

  return inherit( Node, ParametricSpringNode );
} );
