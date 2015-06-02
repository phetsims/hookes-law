// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for graphs in the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var energyGraphString = require( 'string!HOOKES_LAW/energyGraph' );
  var forceGraphString = require( 'string!HOOKES_LAW/forceGraph' );

  /**
   * @param {EnergyViewProperties} properties
   * @param {Object} [options]
   * @constructor
   */
  function EnergyGraphControls( properties, options ) {

    options = _.extend( _.clone( HookesLawConstants.VISIBILITY_PANEL_OPTIONS ), options );

    // radio buttons
    var forceGraphRadioButton = new AquaRadioButton( properties.graphProperty, 'force',
      new Text( forceGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );
    var energyGraphRadioButton = new AquaRadioButton( properties.graphProperty, 'energy',
      new Text( energyGraphString, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
      HookesLawConstants.RADIO_BUTTON_OPTIONS );

    // Adjust touch areas
    var spacing = 20;
    var controls = [
      forceGraphRadioButton,
      energyGraphRadioButton
    ];
    for ( var i = 0; i < controls.length; i++ ) {
      controls[ i ].touchArea = controls[ i ].localBounds.dilatedXY( 10, ( spacing / 2 ) - 1 );
    }

    var content = new VBox( {
      children: [
        forceGraphRadioButton,
        energyGraphRadioButton
      ],
      align: 'left',
      spacing: spacing
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, EnergyGraphControls );
} );
