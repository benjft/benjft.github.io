---
title: ProcVis
dateCreated: 2022-03-18
tagLine: Interactive browser-based simulator that visualises a custom 8-bit Von Neumann processor executing instructions step-by-step, with animated data and command buses.
thumbnailImage: https://www.benjft.uk/assets/posts/2024-06-07-project-summary-procvis/proc-vis.png
tags: [TypeScript, Simulation, Computer Architecture]
---

## Overview

ProcVis is a client-side web application that simulates and visualises how a processor executes instructions. It lets you step through program execution and watch internal state change in real time, making processor internals tangible for learners. A live demo is hosted at [benjft.uk/ProcVis](https://benjft.uk/ProcVis/).

## Technical Details

The simulated processor is a deliberately minimal custom 8-bit Von Neumann architecture:

- **2 general-purpose registers**, ALU, control unit, instruction register, program counter, address register, and 256 bytes of RAM
- **12 instructions** — 6 arithmetic/logical, 2 memory, 4 jump — with immediate and register addressing modes
- **Animated bus visualisation** — data buses light up in blue and command buses in red as execution proceeds
- Registers display values in decimal, hex, or binary on click
- Users can step through individual micro-operations, step full instructions, or run continuously
- The control unit displays a live description of the current operation

Implementation:

- Built entirely in **TypeScript** with no frameworks — plain browser APIs
- Split across two modules: `proc_sim.ts` (simulation logic) and `sim_ui.ts` (UI layer)
- Styled with **Sass**
- Fully client-side — no backend, no build server

## What I Learned

Implementing a processor simulation from scratch forces you to reason precisely about fetch-decode-execute cycles, register state, and memory addressing. Keeping the simulation logic and UI cleanly separated made it much easier to reason about and test the core behaviour independently. The project was my final-year university dissertation, earning a first-class result.
