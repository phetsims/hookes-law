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
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParametricSpringNode = require( 'HOOKES_LAW/common/view/ParametricSpringNode' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

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
     * Creates the icon for the "Intro" screen, a single spring pulled by a robotic arm.
     * @returns {Node}
     */
    createIntroScreenIcon: function() {

      // spring
      var propertySet = ParametricSpringNode.createPropertySet( {
        loops: 3
      } );
      var springNode = new ParametricSpringNode( propertySet, {
        frontColor: HookesLawColors.SINGLE_SPRING_FRONT,
        middleColor: HookesLawColors.SINGLE_SPRING_MIDDLE,
        backColor: HookesLawColors.SINGLE_SPRING_BACK
      } );

      // robotic arm
      var armNode = RoboticArmNode.createIcon( {
        left: springNode.right,
        centerY: springNode.centerY
      } );

      var contentNode = new Node( { children: [ springNode, armNode ] } );

      return createScreenIcon( contentNode );
    },

    /**
     * Creates the icon for the "Systems" screen, parallel springs pulled by a robotic arm.
     * @returns {Node}
     */
    createSystemsScreenIcon: function() {

      // springs
      var propertySet = ParametricSpringNode.createPropertySet( {
        loops: 3
      } );
      var topSpringNode = new ParametricSpringNode( propertySet, {
        frontColor: HookesLawColors.TOP_SPRING_FRONT,
        middleColor: HookesLawColors.TOP_SPRING_MIDDLE,
        backColor: HookesLawColors.TOP_SPRING_BACK
      } );
      var bottomSpringNode = new ParametricSpringNode( propertySet, {
        frontColor: HookesLawColors.BOTTOM_SPRING_FRONT,
        middleColor: HookesLawColors.BOTTOM_SPRING_MIDDLE,
        backColor: HookesLawColors.BOTTOM_SPRING_BACK
      } );
      var springsBox = new VBox( {
        spacing: 10,
        children: [ topSpringNode, bottomSpringNode ]
      } );

      // vertical line that springs connect to
      var verticalLineNode = new Line( 0, 0, 0, 0.65 * springsBox.height, {
        stroke: 'black',
        lineWidth: 3,
        left: springsBox.right,
        centerY: springsBox.centerY
      } );

      // horizontal line that the pincers grab
      var horizontalLineNode = new Line( 0, 0, 10, 0, {
        stroke: 'black',
        lineWidth: 3,
        left: verticalLineNode.right,
        centerY: verticalLineNode.centerY
      } );

      // robotic arm
      var armNode = RoboticArmNode.createIcon( {
        left: verticalLineNode.right,
        centerY: verticalLineNode.centerY
      } );

      var contentNode = new Node( {
        children: [
          topSpringNode,
          bottomSpringNode,
          verticalLineNode,
          horizontalLineNode,
          armNode
        ]
      } );

      return createScreenIcon( contentNode );
    },

    /**
     * Creates the icon for the "Energy" screen, a cartoonish energy bar graph.
     * @returns {Node}
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
    }
  };
} );
