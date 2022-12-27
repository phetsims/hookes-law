// Copyright 2015-2022, University of Colorado Boulder

/**
 * Factory for creating various icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import ParametricSpringNode, { ParametricSpringNodeOptions } from '../../../../scenery-phet/js/ParametricSpringNode.js';
import { HBox, Line, Node, Path, Rectangle, TColor, VBox } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import NibNode from './NibNode.js';
import RoboticArmNode from './RoboticArmNode.js';

// Spring options common to all icons
const COMMON_SPRING_OPTIONS = {
  loops: 3,
  lineWidth: 5
};

// Spring options for all icons related to scene selection
const SCENE_SELECTION_SPRING_OPTIONS = combineOptions<ParametricSpringNodeOptions>( {
  frontColor: HookesLawColors.SCENE_SELECTION_SPRING_FRONT,
  middleColor: HookesLawColors.SCENE_SELECTION_SPRING_MIDDLE,
  backColor: HookesLawColors.SCENE_SELECTION_SPRING_BACK,
  scale: 0.3
}, COMMON_SPRING_OPTIONS );

type ForceVectorIconSelfOptions = {
  length?: number;
};

type ForceVectorIconOptions = ForceVectorIconSelfOptions & ArrowNodeOptions;

type VectorCheckboxContentSelfOptions = {
  vectorType: 'force' | 'displacement';
  arrowFill: TColor;
  spacing?: number; // space between text and vector
};

type VectorCheckboxContentOptions = VectorCheckboxContentSelfOptions;

const HookesLawIconFactory = {

  /**
   * Creates the icon for the "Intro" screen, a single spring pulled by a robotic arm.
   */
  createIntroScreenIcon(): ScreenIcon {

    // spring
    const springNode = new ParametricSpringNode( combineOptions<ParametricSpringNodeOptions>( {
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
   */
  createSystemsScreenIcon(): ScreenIcon {

    // springs
    const topSpringNode = new ParametricSpringNode( combineOptions<ParametricSpringNodeOptions>( {
      frontColor: HookesLawColors.TOP_SPRING_FRONT,
      middleColor: HookesLawColors.TOP_SPRING_MIDDLE,
      backColor: HookesLawColors.TOP_SPRING_BACK
    }, COMMON_SPRING_OPTIONS ) );
    const bottomSpringNode = new ParametricSpringNode( combineOptions<ParametricSpringNodeOptions>( {
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
   */
  createEnergyScreenIcon(): ScreenIcon {

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
   */
  createForceVectorIcon( providedOptions?: ForceVectorIconOptions ): Path {

    const options = optionize<ForceVectorIconOptions, ForceVectorIconSelfOptions, ArrowNodeOptions>()( {

      // ForceVectorIconSelfOptions
      length: 30,

      // ArrowNodeOptions
      fill: 'white',
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
      tailWidth: 10
    }, providedOptions );

    return new ArrowNode( 0, 0, options.length, 0, options );
  },

  /**
   * Creates the content for a vector checkbox, consisting of text and an arrow.
   */
  createVectorCheckboxContent( textNode: Node, providedOptions?: VectorCheckboxContentOptions ): Node {

    const options = optionize<VectorCheckboxContentOptions, VectorCheckboxContentSelfOptions>()( {
      spacing: 10
    }, providedOptions );

    let arrowNode;
    if ( options.vectorType === 'force' ) {
      arrowNode = this.createForceVectorIcon( {
        fill: options.arrowFill
      } );
    }
    else { /* options.vectorType === 'displacement' */
      arrowNode = new LineArrowNode( 0, 0, 30, 0, {
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
   * Creates the icon for selecting the single-spring scene on the "Intro" screen.
   */
  createSingleSpringIcon(): Node {
    return new ParametricSpringNode( SCENE_SELECTION_SPRING_OPTIONS );
  },

  /**
   * Creates the icon for selecting the 2-spring scene on the "Intro" screen.
   */
  createTwoSpringsIcon(): Node {
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
   */
  createSeriesSystemIcon(): Node {
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
   */
  createParallelSystemIcon(): Node {
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