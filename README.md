# ⚡ Wireflow

> A lightweight, modern canvas for drafting chip pinouts, IC packages, and electronic schematics directly in the browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Wireflow** bridges the gap between heavyweight EDA suites (like KiCad, Altium, or EasyEDA) and generic flowchart engines (like Mermaid or Draw.io). It gives hardware developers, technical writers, and AI systems a common, text-first language for describing embedded electronics and control systems.

---

## ✨ Features

- **IC & Package Designer:** Render standard footprints (DIP, QFP, SOP, BGA) or create modular custom breakout boards with labeled pin roles (Input, Output, Power, Ground, High-Z, Bidirectional).
- **Auto-Orthogonal Routing:** Smart A* Manhattan router computes clean 90-degree wire connections around obstacles without manual curve nudging.
- **Declarative & Interactive Editing:** Build visually on an infinite canvas with grid-snapping, or paste structured JSON/YAML definitions to render chips programmatically.
- **Real-Time ERC (Electrical Rules Check):** Instant visual diagnostics for common wiring errors, including shorted power rails, conflicting output drives, and floating inputs.
- **Datasheet-Ready Export:** Generate clean vector SVG, high-DPI PNG, or print-ready PDF formats.
- **Portability:** Export raw netlists in standard JSON or SPICE-compatible formats to pipe directly into downstream simulation tools.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or later)
- `pnpm`, `npm`, or `yarn`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Thejus26/wireflow.git

# 2. Enter project directory
cd wireflow

# 3. Serve the demo locally
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. The browser demo includes a Mermaid-like DSL editor that renders a live embedded-systems diagram.

---

## 📦 Component Definition Format

Every chip in Wireflow can be defined using a clean, readable JSON format:

```json
{
  "$schema": "https://wireflow.dev/schema/v1/chip.json",
  "id": "u1_555",
  "name": "NE555",
  "label": "Precision Timer",
  "package": "DIP-8",
  "position": { "x": 200, "y": 160 },
  "pins": [
    { "pin": 1, "name": "GND",   "type": "ground",         "side": "left" },
    { "pin": 2, "name": "TRIG",  "type": "input",          "side": "left" },
    { "pin": 3, "name": "OUT",   "type": "output",         "side": "left" },
    { "pin": 4, "name": "RESET", "type": "input_pullup",   "side": "left" },
    { "pin": 5, "name": "CTRL",  "type": "analog_input",   "side": "right" },
    { "pin": 6, "name": "THR",   "type": "input",          "side": "right" },
    { "pin": 7, "name": "DISCH", "type": "open_collector", "side": "right" },
    { "pin": 8, "name": "VCC",   "type": "power",          "side": "right" }
  ]
}
```

---

## 🧠 Mermaid-like Wireflow Syntax for AI Diagrams

To make Wireflow easy for LLMs and diagram generators, we support a Mermaid-inspired text DSL where a model can describe a connected system with simple declarative statements.

```wireflow
wireflow
  chip mcu "ESP32" at 120,100 size 180x220
  chip imu "BMP280" at 520,100 size 150x130
  chip relay "12V Relay" at 520,300 size 180x100

  mcu.GPIO4 --> imu.SDA
  mcu.GPIO5 --> imu.SCL
  mcu.VCC --> imu.VCC
  mcu.GND --> imu.GND
  mcu.GPIO18 --> relay.COIL
end
```

This syntax is intentionally compact and readable so an AI can generate diagrams like:

- MCU to sensor bus wiring
- power and ground rails
- actuator control lines
- module-to-module interfaces
- protocol-level signal routing

### Syntax model

- `chip <id> "<label>" at x,y size w x h`
- `module <id> "<label>" at x,y size w x h`
- `<chipId>.<pinName> --> <chipId>.<pinName>`
- optional `wireflow` / `end` block delimiters

This keeps the language close to Mermaid's text-first style while remaining hardware-aware and pin-aware.

---

## 🛠️ Architecture & Tech Stack

Wireflow separates visual rendering, state management, and geometry computation:

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Framework** | [React 18+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | UI components and application state |
| **Canvas Engine** | [HTML5 Canvas / Konva.js](https://konvajs.org/) | High-performance 60fps pan/zoom and component manipulation |
| **Routing** | Custom Orthogonal Maze Router (A*) | Collision-free Manhattan wiring between component terminals |
| **State** | [Zustand](https://github.com/pmndrs/zustand) | Lean, decoupled graph and netlist state |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Workspace UI, modals, and toolbars |
| **Diagram DSL** | Mermaid-inspired text format | AI-friendly generation and embedding |

---

## 🗺️ Roadmap

* [x] Basic canvas grid snapping, zooming, and panning
* [x] Dual In-line Package (DIP) component renderer
* [x] Manual orthogonal wire routing
* [ ] Automated A* obstacle-avoiding router
* [ ] Mermaid-like text parsing for hardware diagrams
* [ ] Text-to-diagram DSL parser (Mermaid-style syntax for ICs)
* [ ] SPICE netlist export (.cir)
* [ ] Pre-built catalog for popular microcontrollers (ESP32, RP2040, ATmega328P)

---

## 🤝 Community & Contributing

We welcome contributions of all kinds—from new IC footprints and routing optimization to UI polish, accessibility improvements, and bug reports.

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Getting Support](SUPPORT.md)
- [Issue Templates](.github/ISSUE_TEMPLATE)

Please read our contributor guidance before submitting code, proposing changes, or filing a bug report.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Demo

The repository now includes a browser demo in `index.html` that renders Mermaid-like embedded-system diagrams directly from DSL text. Open it locally and edit the `textarea` to generate hardware diagrams automatically.
