---
title: Active Matter Tool
dateCreated: 2017-07-27
tagLine: Physics simulation of self-propelled particles in 2D periodic space, written in Java.
tags: [Java, Simulation]
---

## Overview

Active matter describes systems of self-propelled agents — bacteria, synthetic swimmers, or other entities that consume energy to move. This tool simulates "soft" active matter in a 2D toroidal (periodic boundary) space, where particles interact and produce emergent collective behaviour.

## Technical Details

- Written in **Java**, built with **Gradle**
- Simulates particles in a **2D periodic (toroidal) space** — boundaries wrap, eliminating edge effects
- Package structure under `com.benjft.activemattertool`

## What I Built This For

An exploration of computational physics during my undergraduate studies. Implementing the periodic boundary conditions and particle interaction forces from scratch gave me a solid grounding in numerical simulation — translating physical laws into update rules that produce stable, meaningful results over many timesteps.
