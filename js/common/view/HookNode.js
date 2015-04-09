// Copyright 2002-2015, University of Colorado Boulder

//TODO this is a quick-&-dirty temporary implementation
/**
 * The hook used to pull the spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  // constants
  var HOOK_RADIUS = 30;
  var HANDLE_RADIUS = 15;

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

    var hook = new Path( new Shape().arc( HOOK_RADIUS, 0, HOOK_RADIUS, Math.PI / 2, 0 ).lineTo( 200, 0 ), {
      stroke: PhetColorScheme.RED_COLORBLIND,
      lineWidth: 6
    } );

    var handle = new Circle( HANDLE_RADIUS, {
      fill: PhetColorScheme.RED_COLORBLIND,
      centerX: hook.right,
      centerY: 0
    } );

    options.children = [ hook, handle ];
    Node.call( this, options );

    spring.lengthProperty.link( function( length ) {
      thisNode.left = modelViewTransform.modelToViewX( length );
    } );

    // Drag the hook to change displacement
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
          displacement = Math.max( Math.min( displacement, spring.getMaxDisplacement() ), spring.getMinDisplacement() );
          spring.displacementProperty.set( displacement );
        },

        end: function( event ) {}
      }
    ) );
  }

  return inherit( Node, HookNode );
} );
