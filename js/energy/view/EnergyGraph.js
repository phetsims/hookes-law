// Copyright 2020, University of Colorado Boulder

/**
 * EnergyGraph enumerates the graph choices in the Energy screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import hookesLaw from '../../hookesLaw.js';

const EnergyGraph = EnumerationDeprecated.byKeys( [ 'BAR_GRAPH', 'ENERGY_PLOT', 'FORCE_PLOT' ] );

hookesLaw.register( 'EnergyGraph', EnergyGraph );
export default EnergyGraph;