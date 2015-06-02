// Copyright 2002-2015, University of Colorado Boulder

/**
 * Factory for creating various icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var HStrut = require( 'SUN/HStrut' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var equilibriumPositionString = require( 'string!HOOKES_LAW/equilibriumPosition' );

  return {

    /**
     * Creates the content for a vector check box, consisting of text and an arrow.
     *
     * @param {Node} textNode - text, positioned to the left of the vector
     * @param {Object} [options]
     * @returns {Node}
     */
    createVectorCheckBoxContent: function( textNode, options ) {

      options = _.extend( {
        maxTextWidth: textNode.width, // width of the max text used to label a vector check box
        minSpacing: 10, // {number} minimum space between text and vector
        arrowLength: 30, // {number}
        arrowDirection: 'right', // {string} direction that the vector points, 'left' or 'right',
        arrowType: 'shape', // 'shape' (ArrowNode) or 'line' (LineArrowNode)
        arrowFill: 'white' // {string|Color}
      }, options );

      // validate options
      assert && assert( options.arrowType === 'shape' || options.arrowType === 'line' );

      // compute spacing so that arrows on all check boxes will ultimately be left aligned
      var spacing = options.maxTextWidth - textNode.width + options.minSpacing;

      var arrowNode;
      if ( options.arrowType === 'shape' ) {
        arrowNode = new ArrowNode( 0, 0, ( options.arrowDirection === 'left' ? -options.arrowLength : options.arrowLength ), 0, {
          fill: options.arrowFill,
          headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
          headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
          tailWidth: 10
        } );
      }
      else {
        // options.arrowType === 'line'
        arrowNode = new LineArrowNode( 0, 0, ( options.arrowDirection === 'left' ? -options.arrowLength : options.arrowLength ), 0, {
          stroke: options.arrowFill,
          headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
          headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
          headLineWidth: 3,
          tailLineWidth: 3
        } );
      }
      // text - space - vector
      return new HBox( { children: [ textNode, new HStrut( spacing ), arrowNode ] } );
    },

    /**
     * Creates the icon for the equilibrium position check box, consisting of text and a vertical line.
     *
     * @returns {Node}
     */
    createEquilibriumPositionCheckBoxContent: function() {
      var textNode = new Text( equilibriumPositionString, { font: new HookesLawFont( 18 ) } );
      var lineNode = new EquilibriumPositionNode( textNode.height, {
        left: textNode.right + 8,
        centerY: textNode.centerY
      } );
      return new Node( { children: [ textNode, lineNode ] } );
    },

    //TODO use this in createVectorCheckBoxContent
    /**
     * @param {Object} [options]
     * @returns {*}
     */
    createForceVectorIcon: function( options ) {

      options = _.extend( {
        arrowFill: 'white', // {Color|string}
        arrowLength: 30, // {number}
        arrowDirection: 'right' // {string} direction that the vector points, 'left' or 'right',
      }, options );

      return new ArrowNode( 0, 0, ( options.arrowDirection === 'left' ? -options.arrowLength : options.arrowLength ), 0, {
        fill: options.arrowFill,
        headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
        headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
        tailWidth: 10
      } );
    }
  };
} );
