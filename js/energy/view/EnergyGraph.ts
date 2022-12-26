// Copyright 2020-2022, University of Colorado Boulder

/**
 * EnergyGraph enumerates the graph choices in the Energy screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import hookesLaw from '../../hookesLaw.js';

export default class EnergyGraph extends EnumerationValue {

  public static readonly BAR_GRAPH = new EnergyGraph();
  public static readonly ENERGY_PLOT = new EnergyGraph();
  public static readonly FORCE_PLOT = new EnergyGraph();

  public static readonly enumeration = new Enumeration( EnergyGraph );
}

hookesLaw.register( 'EnergyGraph', EnergyGraph );