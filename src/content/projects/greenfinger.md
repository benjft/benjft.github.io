---
title: GreenFinger
dateCreated: 2021-02-21
tagLine: Arduino-based greenhouse automation controller written in C++.
tags: [C++, Arduino, Embedded]
public: false
---

## Overview

GreenFinger is an Arduino project for monitoring and controlling greenhouse conditions. Core logic is encapsulated in a reusable `Greenhouse` class, keeping the main sketch clean and the control logic independently testable.

## Technical Details

- Written in **C++** as an Arduino sketch (`.ino`)
- `Greenhouse.cpp` / `Greenhouse.h` — custom class encapsulating sensing and control logic
- Targets Arduino hardware for embedded deployment

## What I Built This For

A practical hardware project — Arduino is a great platform for low-overhead embedded control, and wrapping the state machine in a class rather than scattering it across the sketch made the logic much easier to follow and extend.
