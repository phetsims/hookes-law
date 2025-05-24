# Hooke's Law - Release Notes
<!-- Developer and designer should collaborate on what to include for any release beyond 1.0. 
For a 1.0 release, only the 1.0 heading and date is needed. 
When releasing a new version, add a release section to the top of the doc. -->

<!-- 
## [1.2] 2000-01-31

### New Features
* Add tier 1 description [link to issue](url)
* 

### Bug Fixes
* Timer resets properly [link to issue](url)
* 

### Other Changes
* :warning: The hipbone no longer connects to the legbone, so if you planned on taking an extended walk, think again.
* 
-->

## 1.2 (2025-05-21)

### New Features
* Alternative Input
* Interactive Highlights
* UI Sounds
* PhET-iO support, including PhET Studio
   
### Bug Fixes
* Small non-zero Displacement values were incorrectly displayed as "0.000 m".  This was fixed by limiting the movement of the robotic hand to 0.01 m intervals in all screens.
* In the Energy screen, the robotic hand can now be moved more smoothly, in 0.01 m intervals. Previous versions moved in 0.05 m intervals and felt too jerky.
* Small non-zero Potential Energy values were incorrectly displayed as "0.0 J". This was fixed by increasing the precision to 2 decimal places.
* Right-to-left (RTL) languages displayed the minus sign on the wrong side of negative numbers. For example, 10- instead of -10.

## 1.1 (2024-07-15)

### New Features
* Preferences
* Dynamic locale: see _Preferences > Localization > Languages_
* TypeScript implementation

## 1.0 (2015-10-21)
