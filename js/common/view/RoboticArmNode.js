// Copyright 2015-2018, University of Colorado Boulder

/**
 * The robotic arm used to pull the spring(s).
 * Origin is at the left-center of the red box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const HingeNode = require( 'HOOKES_LAW/common/view/HingeNode' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );

  // constants
  const PINCER_RADIUS = 35;
  const PINCER_LINE_WIDTH = 6;
  const PINCER_OVERLAP = 2;
  const ARM_HEIGHT = 14;
  const ARM_GRADIENT = new LinearGradient( 0, 0, 0, ARM_HEIGHT )
    .addColorStop( 0, HookesLawColors.ROBOTIC_ARM_FILL )
    .addColorStop( 0.3, 'white' )
    .addColorStop( 1, HookesLawColors.ROBOTIC_ARM_FILL );
  const BOX_SIZE = new Dimension2( 20, 60 );
  const BOX_GRADIENT = new LinearGradient( 0, 0, 0, BOX_SIZE.height )
    .addColorStop( 0, HookesLawColors.ROBOTIC_ARM_FILL )
    .addColorStop( 0.5, 'white' )
    .addColorStop( 1, HookesLawColors.ROBOTIC_ARM_FILL );

  /**
   * @param {RoboticArm} roboticArm
   * @param {Property.<Range>} leftRangeProperty - dynamic range of the left (movable) end of the arm, units = m
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArmNode( roboticArm, leftRangeProperty, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      cursor: 'pointer',
      unitDisplacementLength: 1,  // view length of a 1m displacement
      displacementInterval: null, // {number|null} dragging the arm will snap to multiples of this interval
      tandem: Tandem.optional // because this node is used to create icons
    }, options );

    // red box at right end of the arm, origin is at left-center
    const redBox = new Rectangle( 0, 0, 7, 30, {
      stroke: 'black',
      fill: HookesLawColors.HINGE, // same color as hinge
      lineWidth: 0.5,
      left: 0,
      centerY: 0
    } );

    // gradient box to the right of red box
    const gradientBox = new Rectangle( 0, 0, BOX_SIZE.width, BOX_SIZE.height, {
      stroke: 'black',
      fill: BOX_GRADIENT,
      lineWidth: 0.5,
      left: redBox.right - 1,
      centerY: 0
    } );

    // arm will be sized and positioned by Property observer
    const armNode = new Rectangle( 0, 0, 1, ARM_HEIGHT, {
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
    const hingeNode = new HingeNode( {
      x: this.topPincerClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // pincers and hinge are draggable, other parts are not
    const draggableNode = new Node( {
      children: [
        this.topPincerClosedNode, this.topPincerOpenNode,
        this.bottomPincerClosedNode, this.bottomPincerOpenNode,
        hingeNode
      ]
    } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

    // Drag the pincers or hinge
    let startOffsetX = 0;
    const dragHandler = new SimpleDragHandler( {

      allowTouchSnag: true,

      start: function( event ) {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
        const length = options.unitDisplacementLength * ( roboticArm.leftProperty.get() - roboticArm.right );
        startOffsetX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - length;
      },

      drag: function( event ) {
        const parentX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - startOffsetX;
        const length = parentX / options.unitDisplacementLength;
        let left = leftRangeProperty.get().constrainValue( roboticArm.right + length );

        // constrain to multiples of a specific interval, see #54
        if ( options.displacementInterval ) {
          left = Util.roundToInterval( left, options.displacementInterval );
        }
        left = Util.toFixedNumber( left, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );

        phet.log && phet.log( '>>>>> RoboticArmNode drag' );
        roboticArm.leftProperty.set( left );
      },

      end: function( event ) {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
      },

      // phet-io
      tandem: options.tandem.createTandem( 'dragHandler' )
    } );
    draggableNode.addInputListener( dragHandler );

    roboticArm.leftProperty.link( function( left ) {

      // move the pincers and hinge
      draggableNode.x = options.unitDisplacementLength * ( left - roboticArm.right );

      // resize the arm
      const overlap = 10; // hide ends of arm behind hinge and box
      const armLength = ( gradientBox.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, ARM_HEIGHT );
      armNode.right = gradientBox.left + overlap;
      armNode.centerY = 0;
    } );

    assert && assert( !options.children, 'RoboticArmNode sets children' );
    options.children = [ armNode, redBox, gradientBox, draggableNode ];

    // Do not pass tandem to the supertype, since this Node is not part of the PhET-iO API. See #58.
    Node.call( this, _.omit( options, [ 'tandem' ] ) );
  }

  hookesLaw.register( 'RoboticArmNode', RoboticArmNode );

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
     * @returns {Node}
     * @public
     * @static
     */
    createIcon: function( options ) {

      const topPincerNode = createTopPincerClosed( {
        stroke: HookesLawColors.PINCERS_STROKE,
        lineWidth: PINCER_LINE_WIDTH,
        bottom: PINCER_OVERLAP
      } );

      const bottomPincerNode = createBottomPincerClosed( {
        stroke: HookesLawColors.PINCERS_STROKE,
        lineWidth: PINCER_LINE_WIDTH,
        top: -PINCER_OVERLAP
      } );

      const hingeNode = new HingeNode( {
        left: topPincerNode.right - 12,
        centerY: 0
      } );

      const armNode = new Rectangle( 0, 0, 20, ARM_HEIGHT, {
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
