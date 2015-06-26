// Copyright 2002-2015, University of Colorado Boulder

/**
 * Factory for creating various icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var equilibriumPositionString = require( 'string!HOOKES_LAW/equilibriumPosition' );

  //TODO copied from graphing-lines.IconFactory, move to common code?
  /**
   * Creates a screen icon, all of which have the same rectangular background.
   * This was factored out because at various times one or more screen icons were created programmatically.
   *
   * @param {Node} contentNode the node to be placed on a background
   * @param {Object} [options]
   * @returns {Node}
   */
  var createScreenIcon = function( contentNode, options ) {

    options = _.extend( {
      size: Screen.HOME_SCREEN_ICON_SIZE,
      xScaleFactor: 0.85,
      yScaleFactor: 0.85,
      fill: 'white'
    }, options );

    var background = new Rectangle( 0, 0, options.size.width, options.size.height, { fill: options.fill } );

    contentNode.setScaleMagnitude( Math.min( options.xScaleFactor * background.width / contentNode.width, options.yScaleFactor * background.height / contentNode.height ) );
    contentNode.center = background.center;

    return new Node( { children: [ background, contentNode ], pickable: false } );
  };

  return {

    /**
     * Creates the content for a vector check box, consisting of text and an arrow.
     *
     * @param {Node} textNode - text, positioned to the left of the vector
     * @param {Object} [options]
     * @returns {Node}
     */
    createVectorCheckBoxContent: function( textNode, options ) {

      options = _.extend( {
        maxTextWidth: textNode.width, // width of the max text used to label a vector check box
        spacing: 10, // {number} space between text and vector
        arrowLength: 30, // {number}
        arrowDirection: 'right', // {string} direction that the vector points, 'left' or 'right',
        arrowType: 'shape', // 'shape' (ArrowNode) or 'line' (LineArrowNode)
        arrowFill: 'white' // {string|Color}
      }, options );

      // validate options
      assert && assert( options.arrowType === 'shape' || options.arrowType === 'line' );

      var arrowNode;
      if ( options.arrowType === 'shape' ) {
        arrowNode = this.createVectorIcon( _.extend( { fill: options.arrowFill }, options ) );
      }
      else {
        // options.arrowType === 'line'
        arrowNode = new LineArrowNode( 0, 0, ( options.arrowDirection === 'left' ? -options.arrowLength : options.arrowLength ), 0, {
          stroke: options.arrowFill,
          headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
          headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
          headLineWidth: 3,
          tailLineWidth: 3
        } );
      }
      // text - space - vector
      return new HBox( {
        children: [ textNode, arrowNode ],
        spacing: options.spacing
      } );
    },

    /**
     * Creates the icon for the equilibrium position check box, consisting of text and a vertical line.
     *
     * @returns {Node}
     */
    createEquilibriumPositionCheckBoxContent: function() {
      var textNode = new Text( equilibriumPositionString, { font: new HookesLawFont( 18 ) } );
      var lineNode = new EquilibriumPositionNode( textNode.height, {
        left: textNode.right + 8,
        centerY: textNode.centerY
      } );
      return new Node( { children: [ textNode, lineNode ] } );
    },

    /**
     * @param {Object} [options]
     * @returns {*}
     */
    createVectorIcon: function( options ) {

      options = _.extend( {
        length: 30, // {number}
        fill: 'white', // {Color|string}
        headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
        headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
        tailWidth: 10
      }, options );

      return new ArrowNode( 0, 0, options.length, 0, options );
    },

    /**
     * Creates the icon for the "Energy" screen.
     */
    createEnergyScreenIcon: function() {

      var yAxisNode = new ArrowNode( 0, 0, 0, -100, {
        headHeight: 25,
        headWidth: 25,
        tailWidth: 5
      } );

      var barNode = new Rectangle( 0, 0, 30, 100, {
        fill: HookesLawColors.ENERGY,
        left: yAxisNode.right + 10,
        bottom: yAxisNode.bottom
      } );

      var contentNode = new Node( { children: [ barNode, yAxisNode ] } );

      return createScreenIcon( contentNode );
    }
  };
} );
