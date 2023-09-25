// Copyright 2015-2022, University of Colorado Boulder

/**
 * Colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import hookesLaw from '../hookesLaw.js';

// colors for the spring in single-spring systems
const SINGLE_SPRING_FRONT = new Color( 150, 150, 255 );
const SINGLE_SPRING_MIDDLE = new Color( 0, 0, 255 ); // the dominant color
const SINGLE_SPRING_BACK = new Color( 0, 0, 200 );

// colors for the first spring (top or left) in 2-spring systems
const SPRING1_FRONT = new Color( 221, 191, 255 );
const SPRING1_MIDDLE = new Color( 146, 64, 255 ); // the dominant color
const SPRING1_BACK = new Color( 124, 54, 217 );

// colors for the second spring (bottom or right) in 2-spring systems
const SPRING2_FRONT = new Color( 255, 223, 127 );
const SPRING2_MIDDLE = new Color( 255, 191, 0 ); // the dominant color
const SPRING2_BACK = new Color( 217, 163, 0 );

const HookesLawColors = {

  screenBackgroundColorProperty: new ProfileColorProperty( hookesLaw, 'screenBackgroundColor', {
    default: 'white'
  } ),

  // UI components
  controlPanelFillProperty: new ProfileColorProperty( hookesLaw, 'controlPanelFill', {
    default: 'rgb( 243, 243, 243 )'
  } ),
  controlPanelStrokeProperty: new ProfileColorProperty( hookesLaw, 'controlPanelStroke', {
    default: 'rgb( 125, 125, 125 )'
  } ),
  separatorStrokeProperty: new ProfileColorProperty( hookesLaw, 'separatorStroke', {
    default: 'rgb( 125, 125, 125 )'
  } ),

  // colors for single spring
  SINGLE_SPRING_FRONT: SINGLE_SPRING_FRONT,
  SINGLE_SPRING_MIDDLE: SINGLE_SPRING_MIDDLE,
  SINGLE_SPRING_BACK: SINGLE_SPRING_BACK,

  // colors for series springs
  LEFT_SPRING_FRONT: SPRING1_FRONT,
  LEFT_SPRING_MIDDLE: SPRING1_MIDDLE,
  LEFT_SPRING_BACK: SPRING1_BACK,
  RIGHT_SPRING_FRONT: SPRING2_FRONT,
  RIGHT_SPRING_MIDDLE: SPRING2_MIDDLE,
  RIGHT_SPRING_BACK: SPRING2_BACK,

  // colors for parallel springs
  TOP_SPRING_FRONT: SPRING1_FRONT,
  TOP_SPRING_MIDDLE: SPRING1_MIDDLE,
  TOP_SPRING_BACK: SPRING1_BACK,
  BOTTOM_SPRING_FRONT: SPRING2_FRONT,
  BOTTOM_SPRING_MIDDLE: SPRING2_MIDDLE,
  BOTTOM_SPRING_BACK: SPRING2_BACK,

  // colors for springs in scene selection icons
  sceneSelectionSpringFrontColorProperty: new ProfileColorProperty( hookesLaw, 'sceneSelectionSpringFrontColor', {
    default: 'rgb( 100, 100, 100 )'
  } ),
  sceneSelectionSpringMiddleColorProperty: new ProfileColorProperty( hookesLaw, 'sceneSelectionSpringMiddleColor', {
    default: 'rgb( 50, 50, 50 )'
  } ),
  sceneSelectionSpringBackColorProperty: new ProfileColorProperty( hookesLaw, 'sceneSelectionSpringBackColor', {
    default: 'black'
  } ),

  // robotic arm
  roboticArmFillProperty: new ProfileColorProperty( hookesLaw, 'roboticArmFill', {
    default: 'rgb( 210, 210, 210 )'
  } ),
  roboticArmStrokeProperty: new ProfileColorProperty( hookesLaw, 'roboticArmStroke', {
    default: 'black'
  } ),
  pincersStrokeProperty: new ProfileColorProperty( hookesLaw, 'pincersStroke', {
    default: 'black'
  } ),
  hingeColorProperty: new ProfileColorProperty( hookesLaw, 'hingeColor', {
    default: 'rgb( 236, 35, 23 )'
  } ),

  // walls that spring and robotic arm are connected to
  wallFillProperty: new ProfileColorProperty( hookesLaw, 'wallFill', {
    default: 'rgb( 180, 180, 180 )'
  } ),

  // various quantities
  appliedForceColorProperty: new ProfileColorProperty( hookesLaw, 'appliedForceColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  displacementColorProperty: new ProfileColorProperty( hookesLaw, 'displacementColor', {
    default: 'rgb( 0, 180, 0 )'
  } ),
  energyColorProperty: new ProfileColorProperty( hookesLaw, 'energyColor', {
    default: PhetColorScheme.ELASTIC_POTENTIAL_ENERGY
  } ),
  equilibriumPositionColorProperty: new ProfileColorProperty( hookesLaw, 'equilibriumPositionColor', {
    default: 'rgb( 0, 180, 0 )'
  } )
};

hookesLaw.register( 'HookesLawColors', HookesLawColors );

export default HookesLawColors;