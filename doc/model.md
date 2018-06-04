# Hooke's Law model

This document describes the model for the Hooke's Law simulation.<br>
@author Chris Malley (PixelZoom, Inc.)

## Single Spring

For a single spring, or a system treated as a single "equivalent" spring:

F = kx<br>
E = kx<sup>2</sup> / 2

where:

- F = applied force, N<br>
- k = spring constant, N/m<br>
- x = displacement from equilibrium position, m<br>
- E = potential energy, J

## Series Springs

For 2 springs in series:

F<sub>eq</sub> = F<sub>1</sub> = F<sub>2</sub><br>
k<sub>eq</sub> = 1 / ( 1/k<sub>1</sub> + 1/k<sub>2</sub> )<br>
x<sub>eq</sub> = x<sub>1</sub> + x<sub>2</sub><br>
E<sub>eq</sub> = E<sub>1</sub> + E<sub>2</sub>

where:

- subscript "eq" pertains to a spring that is equivalent to the 2 springs in series
- subscript "1" pertains to the *left* spring in this sim
- subscript "2" pertains to the *right* spring in this sim

## Parallel Springs

For 2 springs in parallel:

F<sub>eq</sub> = F<sub>1</sub> + F<sub>2</sub><br>
k<sub>eq</sub> = k<sub>1</sub> + k<sub>2</sub><br>
x<sub>eq</sub> = x<sub>1</sub> = x<sub>2</sub><br>
E<sub>eq</sub> = E<sub>1</sub> + E<sub>2</sub>

where:

- subscript "eq" pertains to a spring that is equivalent to the 2 springs in parallel
- subscript "1" pertains to the *top* spring in this sim
- subscript "2" pertains to the *bottom* spring in this sim

