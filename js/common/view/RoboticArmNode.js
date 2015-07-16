// Copyright 2002-2015, University of Colorado Boulder

/**
 * The robotic arm used to pull the spring(s).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HingeNode = require( 'HOOKES_LAW/common/view/HingeNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var PINCER_RADIUS = 35;
  var PINCER_LINE_WIDTH = 6;
  var PINCER_OVERLAP = 2;
  var ARM_HEIGHT = 14;
  var ARM_GRADIENT = new LinearGradient( 0, 0, 0, ARM_HEIGHT )
    .addColorStop( 0, HookesLawColors.ROBOTIC_ARM_FILL )
    .addColorStop( 0.3, 'white' )
    .addColorStop( 1, HookesLawColors.ROBOTIC_ARM_FILL );

  /**
   * @param {RoboticArm} roboticArm
   * @param {Property.<Range>} leftRangeProperty - dynamic range of the left (movable) end of the arm, units = m
   * @param {Property.<number>} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArmNode( roboticArm, leftRangeProperty, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      cursor: 'pointer',
      unitDisplacementLength: 1  // view length of a 1m displacement
    }, options );

    // wall at the right end of the arm is attached to, origin is at left-center
    var wallNode = new WallNode( new Dimension2( 25, 60 ), {
      left: 0,
      centerY: 0
    } );

    // arm will be sized and positioned by Property observer
    var armNode = new Rectangle( 0, 0, 1, ARM_HEIGHT, {
      fill: ARM_GRADIENT,
      stroke: HookesLawColors.ROBOTIC_ARM_STROKE,
      lineWidth: 0.5
    } );

    // @private
    this.topPincerClosedNode = createTopPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      bottom: PINCER_OVERLAP
    } );

    // @private
    this.topPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.8 * Math.PI, 0 ), {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: this.topPincerClosedNode.right,
      bottom: 0
    } );

    // @private
    this.bottomPincerClosedNode = createBottomPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      top: -PINCER_OVERLAP
    } );

    // @private
    this.bottomPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.8 * Math.PI, 0, true ), {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: this.bottomPincerClosedNode.right,
      top: 0
    } );

    // hinge, where the pincers are attached
    var hingeNode = new HingeNode( {
      x: this.topPincerClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // pincers and hinge are draggable, other parts are not
    var draggableNode = new Node( {
      children: [
        this.topPincerClosedNode, this.topPincerOpenNode,
        this.bottomPincerClosedNode, this.bottomPincerOpenNode,
        hingeNode
      ]
    } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

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
          left = Util.toFixedNumber( left, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
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
      var armLength = ( wallNode.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, ARM_HEIGHT );
      armNode.right = wallNode.left + overlap;
      armNode.centerY = 0;
    } );

    options.children = [ armNode, wallNode, draggableNode ];
    Node.call( this, options );
  }

  /**
   * Creates the top pincer in closed position.
   * @param {Object} [options]
   * @returns {Node}
   */
  var createTopPincerClosed = function( options ) {
    return new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.9 * Math.PI, -0.1 * Math.PI ), options );
  };

  /**
   * Creates the bottom pincer in closed position.
   * @param {Object} [options]
   * @returns {Node}
   */
  var createBottomPincerClosed = function( options ) {
    return new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.9 * Math.PI, 0.1 * Math.PI, true ), options );
  };

  return inherit( Node, RoboticArmNode, {

    /**
     * Open and close the pincers
     * @param {boolean} pincersOpen
     * @public
     */
    setPincersOpen: function( pincersOpen ) {
      this.topPincerOpenNode.visible = this.bottomPincerOpenNode.visible = pincersOpen;
      this.topPincerClosedNode.visible = this.bottomPincerClosedNode.visible = !pincersOpen;
    }

  }, {

    /**
     * Creates an icon that represents this node.
     * @param {Object} [options]
     * @return {Node}
     * @static
     */
    createIcon: function( options ) {

      var topPincerNode = createTopPincerClosed( {
        stroke: HookesLawColors.PINCERS_STROKE,
        lineWidth: PINCER_LINE_WIDTH,
        bottom: PINCER_OVERLAP
      } );

      var bottomPincerNode = createBottomPincerClosed( {
        stroke: HookesLawColors.PINCERS_STROKE,
        lineWidth: PINCER_LINE_WIDTH,
        top: -PINCER_OVERLAP
      } );

      var hingeNode = new HingeNode( {
        left: topPincerNode.right - 12,
        centerY: 0
      } );

      var armNode = new Rectangle( 0, 0, 20, ARM_HEIGHT, {
        fill: ARM_GRADIENT,
        stroke: HookesLawColors.ROBOTIC_ARM_STROKE,
        lineWidth: 0.5,
        left: hingeNode.right - 5,
        centerY: hingeNode.centerY
      } );

      options.children = [ topPincerNode, bottomPincerNode, armNode, hingeNode ];
      return new Node( options );
    }
  } );
} );
