// Copyright 2020, University of Colorado Boulder

/**
 * EnergyGraph enumerates the graph choices in the Energy screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import hookesLaw from '../../hookesLaw.js';

const EnergyGraph = Enumeration.byKeys( [ 'BAR_GRAPH', 'ENERGY_PLOT', 'FORCE_PLOT' ] );

hookesLaw.register( 'EnergyGraph', EnergyGraph );
export default EnergyGraph;