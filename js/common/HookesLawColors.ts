// Copyright 2015-2023, University of Colorado Boulder

/**
 * Colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import hookesLaw from '../hookesLaw.js';

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
  singleSpringFrontColorProperty: new ProfileColorProperty( hookesLaw, 'singleSpringFrontColor', {
    default: 'rgb( 150, 150, 255 )'
  } ),
  singleSpringMiddleColorProperty: new ProfileColorProperty( hookesLaw, 'singleSpringMiddleColor', {
    default: 'rgb( 0, 0, 255 )' // the dominant color
  } ),
  singleSpringBackColorProperty: new ProfileColorProperty( hookesLaw, 'singleSpringBackColor', {
    default: 'rgb( 0, 0, 200 )'
  } ),

  // colors for 2-spring systems
  // series: spring1 = left, spring2 = right
  // parallel: spring1 = top, spring2 = bottom
  spring1FrontColorProperty: new ProfileColorProperty( hookesLaw, 'spring1FrontColor', {
    default: 'rgb( 221, 191, 255 )'
  } ),
  spring1MiddleColorProperty: new ProfileColorProperty( hookesLaw, 'spring1MiddleColor', {
    default: 'rgb( 146, 64, 255 )' // the dominant color
  } ),
  spring1BackColorProperty: new ProfileColorProperty( hookesLaw, 'spring1BackColorBackColor', {
    default: 'rgb( 124, 54, 217 )'
  } ),
  spring2FrontColorProperty: new ProfileColorProperty( hookesLaw, 'spring2FrontColor', {
    default: 'rgb( 255, 223, 127 )'
  } ),
  spring2MiddleColorProperty: new ProfileColorProperty( hookesLaw, 'spring2MiddleColor', {
    default: 'rgb( 255, 191, 0 )' // the dominant color
  } ),
  spring2BackColorProperty: new ProfileColorProperty( hookesLaw, 'spring2BackColorBackColor', {
    default: 'rgb( 217, 163, 0 )'
  } ),

  // colors for springs in scene selection icons
  sceneSelectionSpringFrontColorProperty: new ProfileColorProperty( hookesLaw, 'sceneSelectionSpringFrontColor', {
    default: 'rgb( 100, 100, 100 )'
  } ),
  sceneSelectionSpringMiddleColorProperty: new ProfileColorProperty( hookesLaw, 'sceneSelectionSpringMiddleColor', {
    default: 'rgb( 50, 50, 50 )' // the dominant color
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