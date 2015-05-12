// Copyright 2002-2015, University of Colorado Boulder

/**
 * The robotic arm used to pull the spring(s).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  var hingeImage = require( 'image!HOOKES_LAW/robotic-arm-hinge.png' );
  var hookImage = require( 'image!HOOKES_LAW/robotic-arm-hook.png' );

  // constants
  var SHOW_ORIGIN = HookesLawQueryParameters.DEV;

  /**
   * @param {RoboticArm} roboticArm
   * @param {Property.<Range>} leftRangeProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArmNode( roboticArm, leftRangeProperty, modelViewTransform, options ) {

    options = _.extend( {
      cursor: 'pointer'
    }, options );

    // origin is at left-center of box
    var boxNode = new Rectangle( 0, 0, 40, 60, {
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
      left: hookNode.right - 14, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // hooke and hinge are draggable, other parts are not
    var draggableNode = new Node( { children: [ hookNode, hingeNode ] } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

    options.children = [ armNode, boxNode, draggableNode ];

    if ( SHOW_ORIGIN ) {
      options.children.push( new Circle( 3, { fill: 'red' } ) );
    }

    Node.call( this, options );

    // Drag the hook or hinge to change displacement
    var dragHandler = new SimpleDragHandler( {

        allowTouchSnag: true,

        previousX: 0,

        start: function( event ) {
          this.previousX = event.currentTarget.globalToParentPoint( event.pointer.point ).x;
        },

        drag: function( event ) {
          var x =  event.currentTarget.globalToParentPoint( event.pointer.point ).x;
          var dx = x - this.previousX;
          this.previousX = x;
          var left = leftRangeProperty.get().constrainValue( roboticArm.leftProperty.get() + modelViewTransform.viewToModelX( dx ) );
          roboticArm.leftProperty.set( left );
        },

        end: function( event ) {}
      }
    );
    draggableNode.addInputListener( dragHandler );

    roboticArm.leftProperty.link( function( left ) {

      // move the hook and hinge
      draggableNode.x = modelViewTransform.modelToViewX( left - roboticArm.right );

      // resize the arm
      var overlap = 10; // hide ends of arm behind hinge and box
      var armLength = ( boxNode.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, 16 );
      armNode.left = draggableNode.right - overlap;
      armNode.centerY = 0;
    } );
  }

  return inherit( Node, RoboticArmNode );
} );
