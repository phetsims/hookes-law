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
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var HOOK_RADIUS = 30;
  var HANDLE_RADIUS = 15;

  /**
   * @param {Property.<number>} displacementProperty
   * @param {Range} displacementRange
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function HookNode( displacementProperty, displacementRange, modelViewTransform, options ) {

    options = _.extend( {
      cursor: 'pointer'
    }, options );

    var hook = new Path( new Shape().arc( HOOK_RADIUS, 0, HOOK_RADIUS, Math.PI / 2, 0 ).lineTo( 200, 0 ), {
      stroke: 'red',
      lineWidth: 6
    });

    var handle = new Circle( HANDLE_RADIUS, {
      fill: 'red',
      centerX: hook.right,
      centerY: 0
    } );

    options.children = [ hook, handle ];
    Node.call( this, options );

    //TODO manipulate displacementProperty, constrained to displacementRange
    this.addInputListener( new SimpleDragHandler() );
  }

  return inherit( Node, HookNode );
} );
