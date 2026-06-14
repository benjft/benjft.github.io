---
title: ProcVis
dateCreated: 2022-03-18
tagLine: Interactive browser-based simulator that visualises a custom 8-bit Von Neumann processor as it executes programs, with animated data and command buses.
thumbnailImage: /projects/procvis/proc-vis.png
tags: [TypeScript, Simulation, Computer Architecture]
---

ProcVis (Processor Visualiser) was my final-year university project — a browser-based tool for making processor internals tangible. Rather than explaining the fetch-execute cycle in the abstract, it lets you write a program, step through each micro-operation, and watch the processor's components light up in real time as data flows between them. It was designed primarily for students encountering computer architecture for the first time.

<!--more-->

## How it Works

The processor is a custom 8-bit Von Neumann design, chosen to be simple enough to fit on screen without being overwhelming. It has the components you'd expect: two general-purpose registers (A and B), an ALU, a Control Unit, a program counter, an instruction register, an address register, and 256 bytes of RAM.

As the processor runs, its internal buses animate to show exactly what's happening at each step. The **blue data buses** carry values between RAM and registers — the main 8-lane bus lights up whenever data is being read or written, and smaller buses carry ALU flags back to the Control Unit. The **red command buses** carry control signals (Set, Enable, Increment, and ALU opcode), making it visually clear which components are being told to act and why.

The Control Unit displays a plain-language description of the current micro-operation as it happens, walking through the fetch-execute cycle and explaining each stage in turn.

## Instruction Set

Rather than adopting an existing 8-bit ISA, I designed a custom instruction set with comprehensibility as the primary goal. It includes 6 arithmetic and logical operations, 2 memory operations, and 4 jump operations, with both immediate and register addressing modes. Immediate instructions become 16-bit by appending the value as a second byte.

## Using It

You write a program by typing instructions directly into the RAM cells. The processor can then be stepped one micro-operation or one full instruction at a time, or left to run continuously. Active buses illuminate with the values they're carrying, and each component changes colour to indicate whether it's being read from or written to.

Clicking a register cycles its display between decimal, hex, and binary — useful when you want to see exactly what's stored. RAM cells work the same way, with the added option of showing the parsed instruction if the cell was written as assembly.

You can [try it in your browser here](https://www.benjft.uk/ProcVis).

## Outcomes

ProcVis was the centrepiece of my final-year project and helped me complete my degree with a 1st. User feedback was broadly positive, though in practice it needed more guided coaching than I'd anticipated — likely a combination of time pressure during testing and questions that didn't naturally prompt exploration. It's something I'd improve in a future iteration.

Overall I'm pleased with how the project turned out and hope to develop it further.
