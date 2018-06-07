// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the "Intro" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Checkbox = require( 'SUN/Checkbox' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var springForceString = require( 'string!HOOKES_LAW/springForce' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  /**
   * @param {IntroViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function IntroVisibilityControls( properties, options ) {

    options = _.extend( {
      tandem: Tandem.required
    }, HookesLawConstants.VISIBILITY_PANEL_OPTIONS, options );

    // text labels on the vector checkboxes
    var appliedForceTextNode = new Text( appliedForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var springForceTextNode = new Text( springForceString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var displacementTextNode = new Text( displacementString, HookesLawConstants.CONTROL_TEXT_OPTIONS );
    var maxTextWidth = _.maxBy( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], function( node ) {
      return node.width;
    } ).width;

    var minSpacing = 10;

    // vector checkboxes, with left-aligned vector icons
    var appliedForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( appliedForceTextNode, {
        arrowFill: HookesLawColors.APPLIED_FORCE,
        spacing: maxTextWidth - appliedForceTextNode.width + minSpacing
      } ),
      properties.appliedForceVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'appliedForceCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var springForceCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( springForceTextNode, {
        arrowFill: HookesLawColors.SINGLE_SPRING,
        spacing: maxTextWidth - springForceTextNode.width + minSpacing
      } ),
      properties.springForceVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'springForceCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var displacementCheckbox = new Checkbox(
      HookesLawIconFactory.createVectorCheckboxContent( displacementTextNode, {
        vectorType: 'displacement',
        arrowFill: HookesLawColors.DISPLACEMENT,
        spacing: maxTextWidth - displacementTextNode.width + minSpacing
      } ),
      properties.displacementVectorVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'displacementCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    // other checkboxes
    var equilibriumPositionCheckbox = new Checkbox(
      HookesLawIconFactory.createEquilibriumPositionCheckboxContent(),
      properties.equilibriumPositionVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'equilibriumPositionCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    var valuesCheckbox = new Checkbox(
      new Text( valuesString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      properties.valuesVisibleProperty,
      _.extend( {
        tandem: options.tandem.createTandem( 'valuesCheckbox' )
      }, HookesLawConstants.CHECK_BOX_OPTIONS ) );

    // 'Values' checkbox pertains to vectors, so enable that checkbox only if one or more of the vectors is selected.
    Property.multilink(
      [ properties.appliedForceVectorVisibleProperty, properties.springForceVectorVisibleProperty, properties.displacementVectorVisibleProperty ],
      function( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) {
        valuesCheckbox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    // Adjust touch areas
    var spacing = 20;
    var checkboxes = [
      appliedForceCheckbox,
      springForceCheckbox,
      displacementCheckbox,
      equilibriumPositionCheckbox,
      valuesCheckbox
    ];
    for ( var i = 0; i < checkboxes.length; i++ ) {
      checkboxes[ i ].touchArea = checkboxes[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: checkboxes,
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  hookesLaw.register( 'IntroVisibilityControls', IntroVisibilityControls );

  return inherit( Panel, IntroVisibilityControls );
} );
