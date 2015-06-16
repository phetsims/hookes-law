// Copyright 2002-2015, University of Colorado Boulder

//TODO borrow from this, then delete it
/**
 * Demonstration of a spring described by a parametric equation.
 * Separated into a front and back part.
 * Also includes slider controls for the parameters.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var CONTROL_FONT = new PhetFont( 16 );
  var TICK_LABEL_FONT = new PhetFont( 14 );
  var SPRING_LINE_WIDTH = 3;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MVSpringNode( options ) {

    Node.call( this );

    // ranges
    var pitchSizeRange = new Range( 0.1, 2, 2 );
    var deltaPhaseRange = new Range( 0, 7, 1 );
    var aspectRatioRange = new Range( 0.3, 3, 1 );
    var lineWidthRange = new Range( 1, 10, 3 );

    // properties
    var pitchSizeProperty = new Property( pitchSizeRange.defaultValue );
    var deltaPhaseProperty = new Property( deltaPhaseRange.defaultValue );
    var aspectRatioProperty = new Property( aspectRatioRange.defaultValue );
    var lineWidthProperty = new Property( lineWidthRange.defaultValue );

    // controls
    var pitchSizeControl = new NumberControl( 'pitch size:', pitchSizeProperty, pitchSizeRange, {
      titleFont: CONTROL_FONT,
      valueFont: CONTROL_FONT,
      majorTicks: [
        { value: pitchSizeRange.min, label: new Text( pitchSizeRange.min, { font: TICK_LABEL_FONT } ) },
        { value: pitchSizeRange.max, label: new Text( pitchSizeRange.max, { font: TICK_LABEL_FONT } ) }
      ],
      decimalPlaces: 2,
      delta: 0.01
    } );

    var deltaPhaseControl = new NumberControl( 'delta phase:', deltaPhaseProperty, deltaPhaseRange, {
      titleFont: CONTROL_FONT,
      valueFont: CONTROL_FONT,
      majorTicks: [
        { value: deltaPhaseRange.min, label: new Text( deltaPhaseRange.min, { font: TICK_LABEL_FONT } ) },
        { value: deltaPhaseRange.max, label: new Text( deltaPhaseRange.max, { font: TICK_LABEL_FONT } ) }
      ],
      decimalPlaces: 2,
      delta: 0.01
    } );

    var aspectRatioControl = new NumberControl( 'aspect ratio:', aspectRatioProperty, aspectRatioRange, {
      titleFont: CONTROL_FONT,
      valueFont: CONTROL_FONT,
      majorTicks: [
        { value: aspectRatioRange.min, label: new Text( aspectRatioRange.min, { font: TICK_LABEL_FONT } ) },
        { value: aspectRatioRange.max, label: new Text( aspectRatioRange.max, { font: TICK_LABEL_FONT } ) }
      ],
      decimalPlaces: 2,
      delta: 0.01
    } );

    var lineWidthControl = new NumberControl( 'line width:', lineWidthProperty, lineWidthRange, {
      titleFont: CONTROL_FONT,
      valueFont: CONTROL_FONT,
      majorTicks: [
        { value: lineWidthRange.min, label: new Text( lineWidthRange.min, { font: TICK_LABEL_FONT } ) },
        { value: lineWidthRange.max, label: new Text( lineWidthRange.max, { font: TICK_LABEL_FONT } ) }
      ],
      decimalPlaces: 1,
      delta: 0.1
    } );

    var controlPanel = new Panel( new HBox( {
        children: [
          new VBox( { children: [ pitchSizeControl, deltaPhaseControl ], spacing: 30 } ),
          new VBox( { children: [ aspectRatioControl, lineWidthControl ], spacing: 30 } )
        ],
      spacing: 40
    } ), {
      fill: 'rgb(240,240,240)',
      scale: 0.75
    } );

    this.addChild( controlPanel );

    var index; // reused herein
    var xOffset = 50;
    var yOffset = 300;
    var amplitude = 50;
    var phase = 0;
    var pointsPerLoop = 50;
    var loops = 10;
    var arrayLength = pointsPerLoop * loops;

    // Spring drawn using a single path
    var springPath = new Path( null, {
      stroke: 'black',
      lineWidth: SPRING_LINE_WIDTH
    } );
    this.addChild( springPath );

    // Update the spring path
    Property.multilink( [ pitchSizeProperty, deltaPhaseProperty, aspectRatioProperty ],
      function( pitchSize, deltaPhase, aspectRatio ) {

        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = xOffset + amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + pitchSize * (index / pointsPerLoop) * amplitude;
          var yCoordinate = yOffset + aspectRatio * amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
          arrayPosition.push( new Vector2( xCoordinate, yCoordinate ) );
        }

        springPath.shape = new Shape();
        springPath.shape.moveToPoint( arrayPosition[ 0 ] );
        for ( index = 1; index < arrayLength; index++ ) {
          springPath.shape.lineToPoint( arrayPosition[ index ] );
        }
      } );

    // Spring drawn using 2 paths, split into front and back pieces to add depth
    var frontPath = new Path( null, {
      stroke: 'lightBlue',
      lineWidth: SPRING_LINE_WIDTH
    } );
    var backPath = new Path( null, {
      stroke: 'blue',
      lineWidth: SPRING_LINE_WIDTH
    } );
    this.addChild( backPath );
    this.addChild( frontPath );

    // Update the front and back paths
    Property.multilink( [ pitchSizeProperty, deltaPhaseProperty, aspectRatioProperty ],
      function( pitchSize, deltaPhase, aspectRatio ) {

        var arrayPosition = [];
        for ( index = 0; index < arrayLength; index++ ) {
          var xCoordinate = xOffset + amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + phase ) + pitchSize * (index / pointsPerLoop) * amplitude;
          var yCoordinate = yOffset + 150 + aspectRatio * amplitude * Math.cos( 2 * Math.PI * index / pointsPerLoop + deltaPhase + phase );
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

    lineWidthProperty.link( function( lineWidth ) {
      springPath.lineWidth = frontPath.lineWidth = backPath.lineWidth = lineWidth;
    } );

    this.mutate( options );
  }

  return inherit( Node, MVSpringNode );
} )
;

