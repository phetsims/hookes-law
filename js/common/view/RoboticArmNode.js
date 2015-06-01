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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Util = require( 'DOT/Util' );

  // images
  var hingeImage = require( 'image!HOOKES_LAW/robotic-arm-hinge.png' );
  var hookImage = require( 'image!HOOKES_LAW/robotic-arm-hook.png' );

  /**
   * @param {RoboticArm} roboticArm
   * @param {Property.<Range>} leftRangeProperty - dynamic range of the left (movable) end of the arm
   * @param {number} equilibriumX - equilibrium position of the system being manipulated
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArmNode( roboticArm, leftRangeProperty, equilibriumX, modelViewTransform, options ) {

    options = _.extend( {
      cursor: 'pointer'
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

    var hookNode = new Image( hookImage, {
      scale: 0.4,
      left: -7, // dependent on image file, so that origin is in center of hook tip
      bottom: 16 // dependent on image file
    } );

    var hingeNode = new Image( hingeImage, {
      scale: 0.4,
      x: hookNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // hooke and hinge are draggable, other parts are not
    var draggableNode = new Node( { children: [ hookNode, hingeNode ] } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

    options.children = [ armNode, boxNode, draggableNode ];

    Node.call( this, options );

    // Drag the hook or hinge
    var dragHandler = new SimpleDragHandler( {

        allowTouchSnag: true,

        startOffsetX: 0,

        start: function( event ) {
          var length = modelViewTransform.modelToViewX( roboticArm.leftProperty.get() - roboticArm.right );
          this.startOffsetX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - length;
        },

        drag: function( event ) {
          var parentX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - ( this.startOffsetX );
          var length = modelViewTransform.viewToModelX( parentX );
          var left = leftRangeProperty.get().constrainValue( roboticArm.right + length );
          roboticArm.leftProperty.set( left );
        },

        end: function( event ) {}
      }
    );
    draggableNode.addInputListener( dragHandler );

    roboticArm.leftProperty.link( function( left ) {

      // move the hook and hinge
      draggableNode.x = modelViewTransform.modelToViewX( left - roboticArm.right );

      // rotate the hook when displacement is displayed as zero
      if ( !dragHandler.dragging && Util.toFixedNumber( left, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES ) === equilibriumX ) {
        //console.log( 'hook up' );//TODO
      }
      else {
        //console.log( 'hook down' );//TODO
      }

      // resize the arm
      var overlap = 10; // hide ends of arm behind hinge and box
      var armLength = ( boxNode.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, 16 );
      armNode.right = boxNode.left + overlap;
      armNode.centerY = 0;
    } );
  }

  return inherit( Node, RoboticArmNode );
} );
