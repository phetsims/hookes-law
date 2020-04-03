// Copyright 2020, University of Colorado Boulder

/**
 * GraphType enumerates the graph choices in the Energy screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import hookesLaw from '../../hookesLaw.js';

const EnergyGraphs = Enumeration.byKeys( [ 'BAR_GRAPH', 'ENERGY_PLOT', 'FORCE_PLOT' ] );

hookesLaw.register( 'GraphType', EnergyGraphs );
export default EnergyGraphs;