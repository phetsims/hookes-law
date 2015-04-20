// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var springForceString = require( 'string!HOOKES_LAW/springForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var equilibriumPositionString = require( 'string!HOOKES_LAW/equilibriumPosition' );
  var valuesString = require( 'string!HOOKES_LAW/values' );

  // constants
  var CHECK_BOX_OPTIONS = { spacing: 8 };
  var TEXT_OPTIONS = { font: new HookesLawFont( 20 ) };

  /**
   * @param {VisibilityProperties} visibilityProperties
   * @param {Object} [options]
   * @constructor
   */
  function VisibilityPanel( visibilityProperties, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15
    }, options );

    // text labels on the vector check boxes
    var appliedForceTextNode = new Text( appliedForceString, TEXT_OPTIONS );
    var springForceTextNode = new Text( springForceString, TEXT_OPTIONS );
    var displacementTextNode = new Text( displacementString, TEXT_OPTIONS );
    var maxTextWidth = _.max( [ appliedForceTextNode, springForceTextNode, displacementTextNode ], function( node ) {
      return node.width;
    } ).width;

    // vector check boxes, with left-aligned vector icons
    var appliedForceCheckBox = new CheckBox(
      createVectorCheckBoxContent( appliedForceTextNode, maxTextWidth, HookesLawColors.APPLIED_FORCE_VECTOR ),
      visibilityProperties.appliedForceVectorVisibleProperty,
      CHECK_BOX_OPTIONS );
    var springForceCheckBox = new CheckBox(
      createVectorCheckBoxContent( springForceTextNode, maxTextWidth, HookesLawColors.SPRING_FORCE_VECTOR ),
      visibilityProperties.springForceVectorVisibleProperty,
      CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox(
      createVectorCheckBoxContent( displacementTextNode, maxTextWidth, HookesLawColors.DISPLACEMENT_VECTOR ),
      visibilityProperties.displacementVectorVisibleProperty,
      CHECK_BOX_OPTIONS );

    var equilibriumPositionCheckBox = new CheckBox(
      new Text( equilibriumPositionString, TEXT_OPTIONS ),
      visibilityProperties.equilibriumPositionVisibleProperty,
      CHECK_BOX_OPTIONS );
    var valuesCheckBox = new CheckBox(
      new Text( valuesString, TEXT_OPTIONS ),
      visibilityProperties.valuesVisibleProperty,
      CHECK_BOX_OPTIONS );

    // 'Values' check box pertains to vectors, so enable that check box only if one or more of the vectors is selected.
    Property.multilink(
      [ visibilityProperties.appliedForceVectorVisibleProperty, visibilityProperties.springForceVectorVisibleProperty, visibilityProperties.displacementVectorVisibleProperty ],
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

  /**
   * Creates the content for a vector check box, consisting of a text and an arrow.
   *
   * @param {Node} textNode text, positioned to the left of the vector
   * @param {number} maxTextWidth width of the max text used to label a vector check box
   * @param {string|Color} arrowFill
   * @param {Object} [options]
   */
  var createVectorCheckBoxContent = function( textNode, maxTextWidth, arrowFill, options ) {

    options = _.extend( {
      minSpacing: 10, // {number} minimum space between text and vector
      arrowLength: 30, // {number}
      arrowDirection: 'right' // {string} direction that the vector points, 'left' or 'right'
    }, options );

    // compute spacing so that arrows on all check boxes will ultimately be left aligned
    var spacing = maxTextWidth - textNode.width + options.minSpacing;

    // text and vector
    return new HBox( {
      children: [
        textNode,
        new HStrut( spacing ),
        new ArrowNode( 0, 0, ( options.arrowDirection === 'left' ? -options.arrowLength : options.arrowLength ), 0, {
          fill: arrowFill,
          headWidth: 20,
          headHeight: 10,
          tailWidth: 10
        } )
      ],
      align: 'center'
    } );
  };

  return inherit( Panel, VisibilityPanel );
} );
