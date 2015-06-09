// Copyright 2002-2015, University of Colorado Boulder

/**
 * The robotic arm used to pull the spring(s).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );

  // images
  var hingeImage = require( 'image!HOOKES_LAW/robotic-arm-hinge.png' );

  // constants
  var PINCER_RADIUS = 35;
  var PINCER_STROKE = 'black';
  var PINCER_LINE_WIDTH = 6;

  /**
   * @param {RoboticArm} roboticArm
   * @param {Property.<Range>} leftRangeProperty - dynamic range of the left (movable) end of the arm
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArmNode( roboticArm, leftRangeProperty, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      cursor: 'pointer',
      unitDisplacementLength: 1  // view length of a 1m displacement
    }, options );

    // origin is at left-center of box
    var boxNode = new Rectangle( 0, 0, 25, 60, {
      fill: 'rgb( 210, 210, 210 )',
      stroke: 'black',
      lineWidth: 0.5,
      left: 0,
      centerY: 0
    } );

    // arm will be sized and positioned by Property observer
    var armNode = new Rectangle( 0, 0, 1, 0, {
      fill: 'rgb( 210, 210, 210 )',
      stroke: 'black',
      lineWidth: 0.5
    } );

    // top pincer, closed and open configurations
    var topPincerClosedNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.9 * Math.PI, -0.1 * Math.PI ), {
      stroke: PINCER_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      bottom: 0
    } );
    var topPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.8 * Math.PI, 0 ), {
      stroke: PINCER_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: topPincerClosedNode.right,
      bottom: 0
    } );

    // bottom pincer, closed and open configurations
    var bottomPincerClosedNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.9 * Math.PI, 0.1 * Math.PI, true ), {
      stroke: PINCER_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      top: 0
    } );
    var bottomPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.8 * Math.PI, 0, true ), {
      stroke: PINCER_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: bottomPincerClosedNode.right,
      top: 0
    } );

    // hinge, where the pincers are attached
    var hingeNode = new Image( hingeImage, {
      scale: 0.4,
      x: topPincerClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // pincers and hinge are draggable, other parts are not
    var draggableNode = new Node( { children: [ topPincerClosedNode, topPincerOpenNode, bottomPincerClosedNode, bottomPincerOpenNode, hingeNode ] } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

    options.children = [ armNode, boxNode, draggableNode ];
    Node.call( this, options );

    // Drag the pincers or hinge
    var dragHandler = new SimpleDragHandler( {

        allowTouchSnag: true,

        startOffsetX: 0,

        start: function( event ) {
          numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
          var length = options.unitDisplacementLength * ( roboticArm.leftProperty.get() - roboticArm.right );
          this.startOffsetX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - length;
        },

        drag: function( event ) {
          var parentX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - ( this.startOffsetX );
          var length = parentX / options.unitDisplacementLength;
          var left = leftRangeProperty.get().constrainValue( roboticArm.right + length );
          roboticArm.leftProperty.set( left );
        },

        end: function( event ) {
          numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
        }
      }
    );
    draggableNode.addInputListener( dragHandler );

    roboticArm.leftProperty.link( function( left ) {

      // move the pincers and hinge
      draggableNode.x = options.unitDisplacementLength * ( left - roboticArm.right );

      // resize the arm
      var overlap = 10; // hide ends of arm behind hinge and box
      var armLength = ( boxNode.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, 16 );
      armNode.right = boxNode.left + overlap;
      armNode.centerY = 0;
    } );

    /**
     * Open and close the pincers
     * @param {boolean} pincersOpen
     */
    this.setPincersOpen = function( pincersOpen ) {
      topPincerOpenNode.visible = bottomPincerOpenNode.visible = pincersOpen;
      topPincerClosedNode.visible = bottomPincerClosedNode.visible = !pincersOpen;
    };
  }

  return inherit( Node, RoboticArmNode );
} );
