TODO

things to discuss:

Instead of "1" and "2" subscripts to refer to springs, the code uses "left" and "right" (for series springs),
"top" and "bottom" (for parallel springs).

Model uses scalars instead of vectors since everything is in 1 dimension (x axis, +x to right)

Concept of "equivalent spring" for a system

Model is general and allows for some things that springs shouldn't do when in a system. For example,
the general model supports moving the left end of a spring. But in a series system, the left end of
the left spring should remain connected to the wall at all times.  Assertions are used to guard
against these types of violations.

No model-view transforms. All conversions are done using unit vectors lengths for the various
1-dimensional quantities (displacement, force, energy). See HookesLawConstants.UNIT_*.

Describe how numberOfInteractionsInProgressProperty is used to decide when to open robotic pincers.