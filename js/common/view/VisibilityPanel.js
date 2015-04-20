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
    var minTextArrowSpacing = 10;
    var appliedForceCheckBox = createVectorCheckBox( visibilityProperties.appliedForceVectorVisibleProperty, appliedForceTextNode, {
      vectorColor: HookesLawColors.APPLIED_FORCE_VECTOR,
      textVectorSpacing: maxTextWidth - appliedForceTextNode.width + minTextArrowSpacing
    } );
    var springForceCheckBox = createVectorCheckBox( visibilityProperties.springForceVectorVisibleProperty, springForceTextNode, {
      vectorColor: HookesLawColors.SPRING_FORCE_VECTOR,
      textVectorSpacing: maxTextWidth - springForceTextNode.width + minTextArrowSpacing
    } );
    var displacementCheckBox = createVectorCheckBox( visibilityProperties.displacementVectorVisibleProperty, displacementTextNode, {
      vectorColor: HookesLawColors.DISPLACEMENT_VECTOR,
      textVectorSpacing: maxTextWidth - displacementTextNode.width + minTextArrowSpacing
    } );

    var equilibriumPositionCheckBox = new CheckBox( new Text( equilibriumPositionString, TEXT_OPTIONS ), visibilityProperties.equilibriumPositionVisibleProperty );
    var valuesCheckBox = new CheckBox( new Text( valuesString, TEXT_OPTIONS ), visibilityProperties.valuesVisibleProperty, CHECK_BOX_OPTIONS );

    // 'Values' check box pertains to vectors, so enable that check box only if one or more of the vectors is selected.
    Property.multilink(
      [ visibilityProperties.appliedForceVectorVisibleProperty, visibilityProperties.springForceVectorVisibleProperty, visibilityProperties.displacementVectorVisibleProperty ],
      function( appliedForceVectorVisible, springForceVectorVisible, displacementVectorVisible ) {
        valuesCheckBox.enabled = ( appliedForceVectorVisible || springForceVectorVisible || displacementVectorVisible );
      } );

    var spacing = 20;
    var children = [
      appliedForceCheckBox,
      springForceCheckBox,
      displacementCheckBox,
      equilibriumPositionCheckBox,
      valuesCheckBox
    ];
    for ( var i = 0; i < children.length; i++ ) {
      children[ i ].touchArea = children[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: children,
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  /**
   * Creates a check box for controlling visibility of a vector
   *
   * @param {Property.<boolean>} property
   * @param {Node} textNode text, positioned to the left of the vector
   * @param {Object} [options]
   */
  var createVectorCheckBox = function( property, textNode, options ) {

    options = _.extend( {
      vectorColor: 'white', // {string|Color}
      textVectorSpacing: 10, // {number} horizontal space between the text and vector
      vectorDirection: 'right' // {string} direction that the vector points, 'left' or 'right'
    }, options );

    // text and vector
    var icon = new HBox( {
      children: [
        textNode,
        new HStrut( options.textVectorSpacing ),
        new ArrowNode( 0, 0, ( options.vectorDirection === 'left' ? -30 : 30 ), 0, {
          fill: options.vectorColor,
          headWidth: 20,
          headHeight: 10,
          tailWidth: 10
        } )
      ],
      align: 'center'
    } );

    return new CheckBox( icon, property, CHECK_BOX_OPTIONS );
  };

  return inherit( Panel, VisibilityPanel );
} );
