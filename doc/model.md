# Hooke's Law model

This document describes the model for the Hooke's Law simulation.

## Singe Spring

For a single spring, or a system treated as a single "equivalent" spring:

F = k * x
E = ( k1 * x1 * x1 ) / 2

where:

F = applied force, N/m
k = spring constant, N/m
x = displacement from equilibrium position, m
E = potential energy, J

## Series Springs

For 2 springs in series:

Feq = F1 = F2
keq = 1 / ( 1/k1 + 1/k2 )
xeq = x1 + x2
Eeq = E1 + E2

where:

subscript "eq" is a spring that is equivalent to the 2 springs in series
subscript "1" pertains to the left spring in this sim
subscript "2" pertains to the right spring in this sim

## Parallel Springs

For 2 springs in parallel:

Feq = F1 + F2
keq = k1 + k2
xeq = x1 = x2
Eeq = E1 + E2

where:

subscript "eq" is a spring that is equivalent to the 2 springs in parallel
subscript "1" pertains to the top spring in this sim
subscript "2" pertains to the bottom spring in this sim

