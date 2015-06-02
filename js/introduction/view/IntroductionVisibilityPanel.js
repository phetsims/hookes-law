// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Introductions" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var IconFactory = require( 'HOOKES_LAW/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var springForceString = require( 'string!HOOKES_LAW/springForce' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {IntroductionViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function IntroductionVisibilityPanel( properties, options ) {

    options = _.extend( _.clone( HookesLawConstants.VISIBILITY_PANEL_OPTIONS ), options );

    // text labels on the vector check boxes
    var appliedForceTextNode = new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var springForceTextNode = new Text( springForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var displacementTextNode = new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var maxTextWidth = _.max( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], function( node ) {
      return node.width;
    } ).width;

    // vector check boxes, with left-aligned vector icons
    var minSpacing = 10;
    var appliedForceCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( appliedForceTextNode, {
        arrowFill: HookesLawColors.APPLIED_FORCE,
        spacing: maxTextWidth - appliedForceTextNode.width + minSpacing
      } ),
      properties.appliedForceVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var springForceCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( springForceTextNode, {
        arrowFill: HookesLawColors.TOTAL_SPRING_FORCE,
        spacing: maxTextWidth - springForceTextNode.width + minSpacing
      } ),
      properties.springForceVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox(
      IconFactory.createVectorCheckBoxContent( displacementTextNode, {
        arrowType: 'line',
        arrowFill: HookesLawColors.DISPLACEMENT,
        spacing: maxTextWidth - displacementTextNode.width + minSpacing
      } ),
      properties.displacementVectorVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );

    // other check boxes
    var equilibriumPositionCheckBox = new CheckBox(
      IconFactory.createEquilibriumPositionCheckBoxContent(),
      properties.equilibriumPositionVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );
    var valuesCheckBox = new CheckBox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS );

    // 'Values' check box pertains to vectors, so enable that check box only if one or more of the vectors is selected.
    Property.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      function( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) {
        valuesCheckBox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Adjust touch areas
    var spacing = 20;
    var checkBoxes = [
      appliedForceCheckBox,
      springForceCheckBox,
      displacementCheckBox,
      equilibriumPositionCheckBox,
      valuesCheckBox
    ];
    for ( var i = 0; i < checkBoxes.length; i++ ) {
      checkBoxes[ i ].touchArea = checkBoxes[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: checkBoxes,
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, IntroductionVisibilityPanel );
} );
