// Copyright 2015-2025, University of Colorado Boulder

/**
 * Functions for creating various icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../../joist/js/ScreenIcon.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode, { ArrowNodeOptions } from '../../../../scenery-phet/js/ArrowNode.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import ParametricSpringNode, { ParametricSpringNodeOptions } from '../../../../scenery-phet/js/ParametricSpringNode.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import NibNode from './NibNode.js';
import RoboticArmNode from './RoboticArmNode.js';
import RoboticHandNode from './RoboticHandNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// Spring options common to all icons
const COMMON_SPRING_OPTIONS = {
  loops: 3,
  lineWidth: 5
};

// Spring options for all icons related to scene selection
const SCENE_SELECTION_SPRING_OPTIONS = combineOptions<ParametricSpringNodeOptions>( {
  frontColor: HookesLawColors.sceneSelectionSpringFrontColorProperty,
  middleColor: HookesLawColors.sceneSelectionSpringMiddleColorProperty,
  backColor: HookesLawColors.sceneSelectionSpringBackColorProperty,
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
      frontColor: HookesLawColors.singleSpringFrontColorProperty,
      middleColor: HookesLawColors.singleSpringMiddleColorProperty,
      backColor: HookesLawColors.singleSpringBackColorProperty
    }, COMMON_SPRING_OPTIONS ) );

    // piece on the spring that robotic arm grabs
    const nibNode = new NibNode( {
      fill: HookesLawColors.singleSpringMiddleColorProperty,
      x: springNode.right,
      centerY: springNode.centerY
    } );

    // robotic arm
    const armNode = HookesLawIconFactory.createRoboticArmIcon( {
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
      frontColor: HookesLawColors.spring1FrontColorProperty,
      middleColor: HookesLawColors.spring1MiddleColorProperty,
      backColor: HookesLawColors.spring1BackColorProperty
    }, COMMON_SPRING_OPTIONS ) );
    const bottomSpringNode = new ParametricSpringNode( combineOptions<ParametricSpringNodeOptions>( {
      frontColor: HookesLawColors.spring2FrontColorProperty,
      middleColor: HookesLawColors.spring2MiddleColorProperty,
      backColor: HookesLawColors.spring2BackColorProperty
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

    // piece on the spring that robotic arm grabs
    const nibNode = new NibNode( {
      fill: 'black',
      x: verticalLineNode.x,
      centerY: verticalLineNode.centerY
    } );

    // robotic arm
    const armNode = HookesLawIconFactory.createRoboticArmIcon( {
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
      fill: HookesLawColors.energyColorProperty,
      left: yAxisNode.right + 10,
      bottom: yAxisNode.bottom
    } );

    const iconNode = new Node( { children: [ barNode, yAxisNode ] } );

    return new ScreenIcon( iconNode );
  },

  /**
   * Creates an icon for the robotic arm.
   */
  createRoboticArmIcon( options: NodeOptions ): Node {

    const roboticHandNode = new RoboticHandNode( Tandem.OPT_OUT );
    roboticHandNode.setGrippersOpen( false );
    roboticHandNode.pickable = false;

    const armNode = new Rectangle( 0, 0, 20, RoboticArmNode.ARM_HEIGHT, {
      fill: RoboticArmNode.ARM_GRADIENT,
      stroke: HookesLawColors.roboticArmStrokeProperty,
      lineWidth: 0.5,
      left: roboticHandNode.right - 5,
      centerY: roboticHandNode.centerY
    } );

    options.children = [ armNode, roboticHandNode ];
    return new Node( options );
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
      sizable: false,
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
      sizable: false,
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
      sizable: false,
      children: [ wallNode, springsBox ]
    } );
  }
};

hookesLaw.register( 'HookesLawIconFactory', HookesLawIconFactory );

export default HookesLawIconFactory;