// Copyright 2002-2015, University of Colorado Boulder

/**
 * The hook used to pull the spring.
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
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // images
  var hingeImage = require( 'image!HOOKES_LAW/robotic-arm-hinge.png' );
  var hookImage = require( 'image!HOOKES_LAW/robotic-arm-hook.png' );

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function HookNode( spring, modelViewTransform, options ) {

    options = _.extend( {
      cursor: 'pointer'
    }, options );

    var thisNode = this;

    var hookNode = new Image( hookImage, {
      scale: 0.5
    } );

    var hingeNode = new Image( hingeImage, {
      scale: 0.5,
      left: hookNode.right - 16,
      bottom: hookNode.bottom
    } );

    options.children = [ hookNode, hingeNode ];
    Node.call( this, options );

    spring.lengthProperty.link( function( length ) {
      thisNode.left = modelViewTransform.modelToViewX( length );
    } );

    // Drag the hook or hinge to change displacement
    this.addInputListener( new SimpleDragHandler( {

        allowTouchSnag: true,

        startOffsetX: 0,  // where the drag started relative to locationProperty, in parent view coordinate

        start: function( event ) {
          var locationX = modelViewTransform.modelToViewX( spring.lengthProperty.get() );
          this.startOffsetX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - locationX;
        },

        drag: function( event ) {
          var parentX = event.currentTarget.globalToParentPoint( event.pointer.point ).x - ( this.startOffsetX );
          var displacement = modelViewTransform.viewToModelX( parentX ) - spring.equilibriumX;
          // constrain to range
          displacement = Math.max( Math.min( displacement, spring.getMaxDisplacement() ), spring.getMinDisplacement() );
          // constrain to delta increment
          displacement = Math.round( displacement / HookesLawConstants.DISPLACEMENT_DELTA ) * HookesLawConstants.DISPLACEMENT_DELTA;
          spring.displacementProperty.set( displacement );
        },

        end: function( event ) {}
      }
    ) );
  }

  return inherit( Node, HookNode );
} );
