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
vectors lengths for the various 1-dimensional quantities (displacement, force, energy).
See [HookesLawConstants](https://github.com/phetsims/hookes-law/blob/master/js/common/HookesLawConstants.js)`.UNIT_*`.

The robotic arm has a pair of pincers that are open when displacement is zero and no user interaction
is taking place.  In order to determine whether user interaction is taking place, Property
`numberOfInteractionsInProgressProperty` is passed to all user-interface components that affect
displacement.  This includes the robotic arm itself, and all NumberControls. When an interaction begins,
numberOfInteractionsInProgressProperty is incremented; when an interaction ends, numberOfInteractionsInProgressProperty
is decremented.  The pincers are opened only when `( displacement === 0 && numberOfInteractionsInProgressProperty.get() === 0 )`.

The implementation of the spring view is based on a parametric equation known as the prolate cycloid.
See the documentation in [ParametricSpringNode](https://github.com/phetsims/scenery-phet/blob/master/js/ParametricSpringNode.js)
for details.

## Reentrant Properties

A few Properties require the use of the `reentrant: true` option, because they participate in cyclic relationships,
and because their computation is prone to floating-point error that triggers cycles.

The first relationship is _x_ = _p_ - _e_, where _x_ is the spring's displacement from equilibrium,
_p_ is the position of the robotic arm's pincer, and _e_ is the spring's equilibrium position.
The user can change _x_ (via a slider) or _p_ (by dragging the robotic arm). Changing _x_ results in computation
of _p_; changing _p_ results in computation of _p_.   So the Properties for _x_ and _p_, `displacementProperty`
in Spring.js and `leftProperty` in RoboticArm.js respectively, have `reentrant: true`.

The second relationship is _F_ = _kx_, where _F_ is applied force, _k_ is spring constant, and _x_ is the spring's
displacement from equilibrium. The user can change _F_, _k_ and _x_. Changing _x_ results in computation of _F_;
changing _F_ results in computation of _x_.  (_k_ can be ignored for the purposes of this discussion.) So the
Properties for _x_ and _F_, `displacementProperty` and `appliedForceProperty` respectively in Spring.js,
require `reentrant: true`.

## Miscellaneous

Regarding memory management: Everything created in this sim (model and view) exists for the lifetime of the sim,
there is no dynamic creation/deletion of objects. All observer/observable relationships also exist for the lifetime
of the sim.  So there is no need to call the various memory-management functions associated with objects
(unlink, dispose, detach, etc.)

For a list of query parameters that are specific to this simulation, see [HookesLawQueryParameters](https://github.com/phetsims/hookes-law/blob/master/js/common/HookesLawQueryParameters.js).
