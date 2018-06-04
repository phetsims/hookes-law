# Hooke's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description in https://github.com/phetsims/hookes-law/blob/master/doc/model.md

Type [Spring](https://github.com/phetsims/hookes-law/blob/master/js/common/model/Spring.js) is the heart of the model,
start there. Type [SeriesSystem](https://github.com/phetsims/hookes-law/blob/master/js/systems/model/SeriesSystem.js)
and [ParallelSystem](https://github.com/phetsims/hookes-law/blob/master/js/systems/model/ParallelSystem.js) expand
the model to describe series and parallel configurations of 2 springs.

The model is 1 dimensional. Everything occurs along the x (horizontal) axis, with positive values to the right.

Since the model is 1-dimensional, various "vectors" (e.g. `appliedForceVector`) are implemented as scalars. 
This simplifies the implementation, and allows us to use simple numbers rather than allocating Vector objects.

For systems of springs, the classical model equations use subscripts '1' and '2' to refer to the springs 
in a system (e.g. k<sub>1</sub>, k<sub>2</sub>). Rather than use subscripts, this implementations 
uses "left" and "right" (for 2 springs in series), "top" and "bottom" (for 2 springs in parallel).

For systems containing more than one spring, you'll see the term "equivalent spring". This is the
single spring that is equivalent to the system.

The model is general and supports some things that springs shouldn't do when in a system. For example,
the general model supports moving the left end of a spring. But in a series system, the left end of
the left spring should remain connected to the wall at all times.  Throughout the implementation,
assertions are used to guard against these types of violations.

## View

Because the model is 1 dimensional, the 2D model-view transform (`ModelViewTransform2`) that is typically found in
PhET simulations is not required. All conversions between model and view coordinate frames are done using unit 
vectors lengths for the various 1-dimensional quantities (displacement, force, energy). See `HookesLawConstants.UNIT_*`.

The robotic arm has a pair of pincers that are open when displacement is zero and no user interaction
is taking place.  In order to determine whether user interaction is taking place, Property
`numberOfInteractionsInProgressProperty` is passed to all user-interface components that affects
displacement. When an interaction begins, numberOfInteractionsInProgressProperty is incremented;
when an interaction ends, numberOfInteractionsInProgressProperty is decremented.  The pincers are
opened only when `( displacement === 0 && numberOfInteractionsInProgressProperty.get() === 0 )`.

The implementation of the spring view is based on a parametric equation known as the prolate cycloid.
See the documentation in `ParametricSpringNode` for details.

## Miscellaneous

Regarding memory management: Everything created in this sim (model and view) exists for the lifetime of the sim,
there is no dynamic creation/deletion of objects. All observer/observable relationships also exist for the lifetime
of the sim.  So there is no need to call the various memory-management functions associated with objects
(unlink, dispose, detach, etc.)

For a list of query parameters that are specific to this simulation, see [HookesLawQueryParameters](https://github.com/phetsims/hookes-law/blob/master/js/common/HookesLawQueryParameters.js).
