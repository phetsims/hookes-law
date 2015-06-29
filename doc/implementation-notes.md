# Hooke's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

Start by reading the model description in https://github.com/phetsims/hookes-law/blob/master/doc/model.md

Type `Spring` is the heart of the model, start there. Type `SeriesSystem` and `ParallelSystem` expand
the model to describe series and parallel configurations of 2 springs.

The model is 1 dimensional. Everything occurs along the x (horizontal) axis, with positive value to the right.

Because the model is 1 dimensional, the 2D model-view transform (`ModelViewTransform2`) that is typically found in
PhET simulations is not required. All conversions are done using unit vectors lengths for the various
1-dimensional quantities (displacement, force, energy). See `HookesLawConstants.UNIT_*`.

The user interface represents a number of quantities as vectors, and their associated properties
are referred to as vectors in the code (e.g. `appliedForceVector`).  Since the model is 1-dimensional,
these "vectors" are implemented as scalars instead of vectors. This simplifies the implementation,
and allows us to use simple numbers rather than allocating Vector objects.

For systems of springs, the classical model equations use subscripts '1' and '2' to refer to the springs 
in a system (e.g. k<sub>1</sub>, k<sub>2</sub>). Rather than use subscripts, this implementations 
uses "left" and "right" (for 2 springs in series), "top" and "bottom" (for 2 springs in parallel).

For systems containing more than one spring, you'll see the term "equivalent spring". This is the
single spring that is equivalent to the system.

The model is general and supports some things that springs shouldn't do when in a system. For example,
the general model supports moving the left end of a spring. But in a series system, the left end of
the left spring should remain connected to the wall at all times.  Throughout the implementation,
assertions are used to guard against these types of violations.

The robotic arm has a pair of pincers that are open when displacement is zero and no user interaction
is taking place.  In order to determine whether user interaction is taking place, Property
`numberOfInteractionsInProgressProperty` is passed to any user-interface component that affects
displacement.  When an interaction begins, numberOfInteractionsInProgressProperty is incremented;
when an interaction ends, numberOfInteractionsInProgressProperty is decremented.  The pincers are
opened only when `( displacement === 0 && numberOfInteractionsInProgressProperty.get() === 0 )`.
