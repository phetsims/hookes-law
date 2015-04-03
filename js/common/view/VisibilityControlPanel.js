// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for visibility of various representations in the view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
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
      xMargin: 15,
      yMargin: 15
    }, options );

    var appliedForceCheckBox = new CheckBox( new Text( appliedForceString, TEXT_OPTIONS ), appliedForceVectorVisibleProperty, CHECK_BOX_OPTIONS );
    var springForceCheckBox = new CheckBox( new Text( springForceString, TEXT_OPTIONS ), springForceVectorVisibleProperty, CHECK_BOX_OPTIONS );
    var displacementCheckBox = new CheckBox( new Text( displacementString, TEXT_OPTIONS ), displacementVectorVisibleProperty, CHECK_BOX_OPTIONS );
    var equilibriumPositionCheckBox = new CheckBox( new Text( equilibriumPositionString, TEXT_OPTIONS ), equilibriumPositionVisibleProperty, CHECK_BOX_OPTIONS );
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

  return inherit( Panel, VisibilityControlPanel );
} );
