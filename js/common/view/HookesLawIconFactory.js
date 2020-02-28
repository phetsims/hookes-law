// Copyright 2015-2020, University of Colorado Boulder

/**
 * Factory for creating various icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import ParametricSpringNode from '../../../../scenery-phet/js/ParametricSpringNode.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import hookesLawStrings from '../../hookes-law-strings.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import HookesLawFont from '../HookesLawFont.js';
import EquilibriumPositionNode from './EquilibriumPositionNode.js';
import NibNode from './NibNode.js';
import RoboticArmNode from './RoboticArmNode.js';

const equilibriumPositionString = hookesLawStrings.equilibriumPosition;

// Spring options common to all icons
const COMMON_SPRING_OPTIONS = {
  loops: 3,
  lineWidth: 5
};

// Spring options for all icons related to scene selection
const SCENE_SELECTION_SPRING_OPTIONS = merge( {
  frontColor: HookesLawColors.SCENE_SELECTION_SPRING_FRONT,
  middleColor: HookesLawColors.SCENE_SELECTION_SPRING_MIDDLE,
  backColor: HookesLawColors.SCENE_SELECTION_SPRING_BACK,
  scale: 0.3
}, COMMON_SPRING_OPTIONS );

const HookesLawIconFactory = {

  /**
   * Creates the icon for the "Intro" screen, a single spring pulled by a robotic arm.
   * @returns {Node}
   * @public
   * @static
   */
  createIntroScreenIcon: function() {

    // spring
    const springNode = new ParametricSpringNode( merge( {
      frontColor: HookesLawColors.SINGLE_SPRING_FRONT,
      middleColor: HookesLawColors.SINGLE_SPRING_MIDDLE,
      backColor: HookesLawColors.SINGLE_SPRING_BACK
    }, COMMON_SPRING_OPTIONS ) );

    // piece that pincers grab
    const nibNode = new NibNode( {
      fill: HookesLawColors.SINGLE_SPRING_MIDDLE,
      x: springNode.right,
      centerY: springNode.centerY
    } );

    // robotic arm
    const armNode = RoboticArmNode.createIcon( {
      left: springNode.right,
      centerY: springNode.centerY
    } );

    const iconNode = new Node( { children: [ armNode, springNode, nibNode ] } );

    return new ScreenIcon( iconNode );
  },

  /**
   * Creates the icon for the "Systems" screen, parallel springs pulled by a robotic arm.
   * @returns {Node}
   * @public
   * @static
   */
  createSystemsScreenIcon: function() {

    // springs
    const topSpringNode = new ParametricSpringNode( merge( {
      frontColor: HookesLawColors.TOP_SPRING_FRONT,
      middleColor: HookesLawColors.TOP_SPRING_MIDDLE,
      backColor: HookesLawColors.TOP_SPRING_BACK
    }, COMMON_SPRING_OPTIONS ) );
    const bottomSpringNode = new ParametricSpringNode( merge( {
      frontColor: HookesLawColors.BOTTOM_SPRING_FRONT,
      middleColor: HookesLawColors.BOTTOM_SPRING_MIDDLE,
      backColor: HookesLawColors.BOTTOM_SPRING_BACK
    }, COMMON_SPRING_OPTIONS ) );
    const springsBox = new VBox( {
      spacing: 10,
      children: [ topSpringNode, bottomSpringNode ]
    } );

    // vertical line that springs connect to
    const verticalLineNode = new Line( 0, 0, 0, 0.65 * springsBox.height, {
      stroke: 'black',
      lineWidth: 3,
      x: springsBox.right,
      centerY: springsBox.centerY
    } );

    // piece that pincers grab
    const nibNode = new NibNode( {
      fill: 'black',
      x: verticalLineNode.x,
      centerY: verticalLineNode.centerY
    } );

    // robotic arm
    const armNode = RoboticArmNode.createIcon( {
      left: verticalLineNode.right,
      centerY: verticalLineNode.centerY
    } );

    const iconNode = new Node( {
      children: [
        armNode,
        topSpringNode,
        bottomSpringNode,
        verticalLineNode,
        nibNode
      ]
    } );

    return new ScreenIcon( iconNode );
  },

  /**
   * Creates the icon for the "Energy" screen, a cartoonish bar graph.
   * @returns {Node}
   * @public
   * @static
   */
  createEnergyScreenIcon: function() {

    const yAxisNode = new ArrowNode( 0, 0, 0, -100, {
      headHeight: 25,
      headWidth: 25,
      tailWidth: 5
    } );

    const barNode = new Rectangle( 0, 0, 30, 100, {
      fill: HookesLawColors.ENERGY,
      left: yAxisNode.right + 10,
      bottom: yAxisNode.bottom
    } );

    const iconNode = new Node( { children: [ barNode, yAxisNode ] } );

    return new ScreenIcon( iconNode );
  },

  /**
   * Creates a force vector icon.
   *
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  createForceVectorIcon: function( options ) {

    options = merge( {
      length: 30, // {number}
      fill: 'white', // {Color|string}
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
      tailWidth: 10
    }, options );

    return new ArrowNode( 0, 0, options.length, 0, options );
  },

  /**
   * Creates the content for a vector checkbox, consisting of text and an arrow.
   *
   * @param {Node} textNode - text, positioned to the left of the vector
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  createVectorCheckboxContent: function( textNode, options ) {

    options = merge( {
      maxTextWidth: textNode.width, // width of the max text used to label a vector checkbox
      spacing: 10, // {number} space between text and vector
      arrowLength: 30, // {number}
      arrowDirection: 'right', // {string} direction that the vector points, 'left' or 'right',
      vectorType: 'force', // 'force' (ArrowNode) or 'displacement' (LineArrowNode)
      arrowFill: 'white' // {string|Color}
    }, options );

    // validate options
    assert && assert( options.arrowDirection === 'left' || options.arrowDirection === 'right' );
    assert && assert( options.vectorType === 'force' || options.vectorType === 'displacement' );

    let arrowNode;
    if ( options.vectorType === 'force' ) {
      arrowNode = this.createForceVectorIcon( merge( { fill: options.arrowFill }, options ) );
    }
    else {
      // options.vectorType === 'displacement'
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
   * Creates the icon for the equilibrium position checkbox, consisting of text and a vertical dashed line.
   * @returns {Node}
   * @public
   * @static
   */
  createEquilibriumPositionCheckboxContent: function() {
    const textNode = new Text( equilibriumPositionString, { font: new HookesLawFont( 18 ) } );
    const lineNode = new EquilibriumPositionNode( textNode.height, {
      left: textNode.right + 8,
      centerY: textNode.centerY
    } );
    return new Node( { children: [ textNode, lineNode ] } );
  },

  /**
   * Creates the icon for selecting the single-spring scene on the "Intro" screen.
   * @returns {Node}
   * @public
   * @static
   */
  createSingleSpringIcon: function() {
    return new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
  },

  /**
   * Creates the icon for selecting the 2-spring scene on the "Intro" screen.
   * @returns {Node}
   * @public
   * @static
   */
  createTwoSpringsIcon: function() {
    return new VBox( {
      spacing: 5,
      children: [
        new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS ),
        new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS )
      ]
    } );
  },

  /**
   * Creates the icon for selecting the series system on the "Systems" screen.
   * @returns {Node}
   * @public
   * @static
   */
  createSeriesSystemIcon: function() {
    const leftSpringNode = new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
    const rightSpringNode = new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
    rightSpringNode.left = leftSpringNode.right;
    const wallNode = new Line( 0, 0, 0, 1.2 * leftSpringNode.height, {
      stroke: 'black',
      lineWidth: 2
    } );
    return new HBox( {
      spacing: 0,
      children: [ wallNode, leftSpringNode, rightSpringNode ]
    } );
  },

  /**
   * Creates the icon for selecting the parallel system on the "Systems" screen.
   * @returns {Node}
   * @public
   * @static
   */
  createParallelSystemIcon: function() {
    const topSpringNode = new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
    const bottomSpringNode = new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
    const springsBox = new VBox( {
      spacing: 5,
      children: [ topSpringNode, bottomSpringNode ]
    } );
    const wallNode = new Line( 0, 0, 0, springsBox.height, {
      stroke: 'black',
      lineWidth: 2
    } );
    return new HBox( {
      spacing: 0,
      children: [ wallNode, springsBox ]
    } );
  }
};

hookesLaw.register( 'HookesLawIconFactory', HookesLawIconFactory );

export default HookesLawIconFactory;