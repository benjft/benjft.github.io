---
title: ScanSolver
dateCreated: 2021-08-04
tagLine: A Python tool that finds the fastest orbit for a SCANSat satellite to map 100% of a planet's surface in Kerbal Space Program.
thumbnailImage: /projects/scansolver/scanSolver_thumbnail.jpg
headerImage: /projects/scansolver/scanSolver.webp
tags: [Python, Simulation]
---

## Overview

ScanSolver is a tool for Kerbal Space Program that calculates optimal satellite orbits for the SCANSat mod, helping users achieve 100% planetary surface coverage as quickly as possible. SCANSat adds ground-scanning modules for mapping resources, terrain, and anomalies — each scanner sweeps a strip of ground beneath the satellite, and the goal is to tile the planet with no gaps.

The problem is that the strip width changes with altitude and planet size, and the orbital period must be tuned so successive passes fit together precisely. Pick the wrong orbit and it either misses patches, takes far longer than necessary, or violates the scanner's altitude limits.

The tool accepts scanner parameters and outputs valid orbital parameters: semi-major axis (the orbit's average radius from the planet centre), eccentricity (how elliptical the orbit is — 0 is a perfect circle), and the number of orbits to complete the scan.

It was written in **Python** as a CLI tool, with **KerboScript** for in-game kOS scripting. The solver evolved through three versions, each meaningfully improving on the last.

## Background

Think of the scanner as a searchlight pointing straight down. As the satellite orbits, the light sweeps a strip across the planet's surface. The **Field of View (FoV)** is the angular width of that strip (measured in degrees at the equator). A wider strip means fewer passes needed to cover the whole planet, but FoV isn't constant — it narrows as you fly lower or orbit a smaller body.

Each SCANSat scanning module has four key parameters:

- **Field of View (FoV)** — the ground track width in degrees at the equator
- **Minimum altitude** — below which the scanner doesn't work
- **Best altitude** — the altitude at which FoV reaches its maximum
- **Maximum altitude** — above which the scanner doesn't work

The effective FoV depends on both altitude and the size of the body being scanned:

- Below best altitude: <br/><span class="formula-center">$F(A) = F_0 \cdot \frac{A}{A_\text{best}}$</span>
- At or above best altitude: <br/> <span class="formula-center">$F(A) = F_0$</span>
- Smaller bodies scale down: <br/> <span class="formula-center">$F(R) = F_0 \cdot \sqrt{\frac{R_\text{Kerbin}}{R}}$</span>
- FoV is capped at 20°

Combined:
<span class="formula-center">
$$F(A,R) = \min\!\left(F_0 \cdot \frac{\min(A,A_\text{best})}{A_\text{best}} \cdot \sqrt{\frac{R_\text{Kerbin}}{\min(R,R_\text{Kerbin})}},\ 20\right)$$
</span>
In short: fly closer to the minimum altitude and the strip narrows, requiring more passes. Orbit a smaller body and the strip actually widens — the same scanner covers more relative ground on a compact world, so fewer passes are needed. The cap at 20° means that for some smaller bodies the effective best altitude is lower.

## Version 1 — Circular Polar Orbits

The first version considers only circular orbits at exactly 90° inclination (passing directly over both poles, so every strip of longitude gets scanned).

The key insight is to tune the orbital period to the planet's rotation so the ground track shifts by exactly one strip width on each pass — like a barcode being printed one line at a time. This is called a **surface resonance**: the satellite completes $C$ orbits in the same time the planet completes $N$ full rotations (one rotation = one **sidereal day**, i.e. one full spin relative to the stars). After $N$ rotations, $N$ evenly-spaced strips have been swept and the surface is fully covered.

For the fraction $C/N$ to guarantee $N$ distinct tracks (rather than repeating some), $C$ and $N$ must be co-prime (share no common factors).

**Method:**

1. Compute the minimum number of ground tracks needed:<br/> <span class="formula-center">$N = \lceil 180 / F(R) \rceil$</span>
2. For each co-prime $C$ of $N$, compute the required orbital period:<br/> <span class="formula-center">$T_\text{orbit} = T_\text{day} \cdot C/N$</span>
3. Check that the resulting altitude is above the minimum — if so, the orbit is valid
4. The smallest valid $C$ gives the fewest sidereal days to complete the scan

## Version 2 — Elliptical Orbits

Version 2 extends the solver to elliptical orbits. On an ellipse, a satellite moves faster at its lowest point (**periapsis**) and slower at its highest point (**apoapsis**). By placing apoapsis over the equator — where scanning resolution matters most — the scanner lingers there longer. A faster, lower overall orbit can achieve the same equatorial coverage as a slower circular one, cutting time to completion.

The minimum eccentricity is found by solving for when the equatorial FoV exactly equals the required track spacing. This yields a cubic in eccentricity $e$:
<span class="formula-center">
    $$0 = 4(a \cdot A)e^3 + R^2 e^2 + 2A(R - 2a)e + A^2$$
</span>

where $A$ is the minimum required equatorial altitude, $R$ is the body radius, and $a$ is the semi-major axis. A single real root means no valid orbit exists at this size (the satellite would always be moving too fast to scan adequately); otherwise the second-largest root gives the minimum $e$ and the largest gives the maximum.

Additional constraints bound eccentricity further:

- **Polar minimum altitude:** <br/> <span class="formula-center">$e_\text{poles} = \sqrt{1 - \frac{R + A_\text{min}}{a}}$</span>
- **Safe periapsis:** <br/> <span class="formula-center">$e_\text{peri} = 1 - \frac{R + A_\text{safe}}{a}$</span>
- **Maximum apoapsis:** <br/> <span class="formula-center">$e_\text{apo} = \frac{R + A_\text{max}}{a} - 1$</span>

The algorithm increments $C$ looking for a valid eccentricity window, then increments $N$ and checks whether $C$ can be reduced again — stopping when $N/C$ drops below the minimum altitude constraint everywhere.

## Version 3 — Planetary Rotation

Version 3 accounts for the planet rotating beneath the satellite during each orbit. While the satellite is flying, the ground is moving sideways — so the scan strip isn't a straight north-south line but an S shape (may appear to be a diagonal line at low eccentricities). This "smearing" effect widens the effective coverage, and the amount of smear depends on how much the planet rotates beneath the satellite during each orbit.
<figure>
    <img src="/projects/scansolver/MinmusScan.png" alt="Highly Eliptical Scan Of Minmus"/>
    <figcaption>
        <p>An elliptical scan of Minmus shows how horizontal the orbit lines can be in high orbits</p>
    </figcaption>
</figure>

This is most pronounced in highly eccentric orbits. This is because, as we are placing the apoapsis over the equator, the satellite is moving slowest over the equator while the planet's surface moves fastest at the equator. This increases the "smear" factor there, which also tends to be where the effective coverage is lowest.


The effective FoV at a given latitude (where $x = \cos(\text{latitude})$) becomes:
<span class="formula-center">
    $$F = F_0 \cdot \frac{\frac{a(1-e^2)}{1-ex} - R}{A_\text{best}}$$
</span>

The smearing scaling factor is:
<span class="formula-center">
    $$S = \frac{1}{x} + \frac{C}{N} \cdot \frac{(1-e^2)^{3/2}}{(1-ex)^2}$$
</span>

The inequality to satisfy at all latitudes is $S \cdot F \geq \frac{180}{N}$. Because both latitude and eccentricity appear together with no clean separation, this has no closed-form solution — a **hybrid bisection and Newton's method** numerical solver is used instead to find the eccentricity bounds. The tool outputs an *interval* of valid eccentricities rather than a single value, allowing for more flexibility in the orbit
