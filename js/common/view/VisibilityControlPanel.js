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
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
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
   * @param {Property.<boolean>} appliedForceVectorVisibleProperty
   * @param {Property.<boolean>} springForceVectorVisibleProperty
   * @param {Property.<boolean>} displacementVectorVisibleProperty
   * @param {Property.<boolean>} equilibriumPositionVisibleProperty
   * @param {Property.<boolean>} valuesVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function VisibilityControlPanel( appliedForceVectorVisibleProperty, springForceVectorVisibleProperty, displacementVectorVisibleProperty,
                                   equilibriumPositionVisibleProperty, valuesVisibleProperty, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15
    }, options );

    var appliedForceCheckBox = createVectorCheckBox( appliedForceVectorVisibleProperty, appliedForceString, HookesLawColors.APPLIED_FORCE_VECTOR );
    var springForceCheckBox = createVectorCheckBox( springForceVectorVisibleProperty, springForceString, HookesLawColors.SPRING_FORCE_VECTOR );
    var displacementCheckBox = createVectorCheckBox( displacementVectorVisibleProperty, displacementString, HookesLawColors.DISPLACEMENT_VECTOR );
    var equilibriumPositionCheckBox = new CheckBox( new Text( equilibriumPositionString, TEXT_OPTIONS ), equilibriumPositionVisibleProperty );
    var valuesCheckBox = new CheckBox( new Text( valuesString, TEXT_OPTIONS ), valuesVisibleProperty, CHECK_BOX_OPTIONS );

    var content = new VBox( {
      children: [
        appliedForceCheckBox,
        springForceCheckBox,
        displacementCheckBox,
        equilibriumPositionCheckBox,
        valuesCheckBox
      ],
      align: 'left',
      spacing: 10
    } );

    Panel.call( this, content, options );
  }

  /**
   * Creates a check box for controlling visibility of a vector
   *
   * @param {Property.<boolean>} property
   * @param {string} text text, positioned to the left of the vector
   * @param {string|Color} vectorColor vector color
   * @param {string} vectorDirection direction that the vector points, 'left' or 'right'
   */
  var createVectorCheckBox = function( property, text, vectorColor, options ) {

    options = _.extend( {
      textVectorSpacing: 10, // {number} horizontal space between the text and vector
      vectorDirection: 'right' // {string} direction that the vector points, 'left' or 'right'
    }, options );

    // text and vector
    var icon = new HBox( {
      children: [
        new Text( text, TEXT_OPTIONS ),
        new ArrowNode( 0, 0, ( options.vectorDirection === 'left' ? -30 : 30 ), 0, {
          fill: vectorColor,
          headWidth: 20,
          headHeight: 10,
          tailWidth: 10
        } )
      ],
      align: 'center',
      spacing: options.textVectorSpacing
    } );

    return new CheckBox( icon, property, CHECK_BOX_OPTIONS );
  };

  return inherit( Panel, VisibilityControlPanel );
} );
