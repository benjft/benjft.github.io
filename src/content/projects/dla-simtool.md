---
title: DLA-SimTool
dateCreated: 2016-12-07
tagLine: Simulates diffusion-limited aggregation and measures the fractal dimension of the resulting structures.
tags: [Go, Python, Simulation]
---

## Overview

DLA-SimTool models diffusion-limited aggregation (DLA) on a lattice — the process by which randomly diffusing particles stick together to form fractal-like clusters. Written as part of a scientific computing module at the University of Nottingham.

Beyond simulation, the tool analyses the geometry of generated aggregates by computing their Hausdorff dimension.

## Technical Details

- Written in **Go**, with **Python** scripts for post-processing
- Runs in 2D or higher dimensions (arbitrary dimension support, with expected time complexity growth)
- Configurable **sticking probability** (`-pstick`) — how likely a particle adheres when it reaches a valid site
- **Batch mode** (`-runs`) for multiple randomised runs and statistical averaging
- Parameter sweeps via `varysticking` and `varydimensions` commands
- Exports 2D aggregates as **SVG** files (colour-coded by particle addition order) and raw **CSV** data
- Save/load of simulation results to avoid recomputation

## What I Learned

This was my first substantial Go project. Implementing a random walk on a lattice is straightforward; the interesting work was in the Hausdorff dimension analysis, which required reasoning carefully about how aggregate mass scales with radius.
