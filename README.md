# Pipeline Builder

A visual AI pipeline builder where you drag, connect, and run nodes on a canvas. Built with React and FastAPI.

![Pipeline Builder](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100-009688?style=flat&logo=fastapi) ![ReactFlow](https://img.shields.io/badge/ReactFlow-11-ff0072?style=flat)

---

## What it does

You drag nodes onto a canvas, wire them together, and submit the pipeline. The backend validates the structure and tells you whether your pipeline has a clean execution order or if there's a cycle somewhere causing issues.

I built nine different node types — each one serves a different purpose in a pipeline and they all connect through typed input/output handles.

---

## Running it locally

**Frontend**
```bash
cd frontend
npm install
npm start
```

**Backend**
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Frontend → `http://localhost:3000` · Backend → `http://localhost:8000`

---

## Node types

| Node | What it does |
|------|-------------|
| **Input** | Entry point — defines a named input with a type |
| **Output** | Exit point — captures the final result |
| **LLM** | Calls a language model with a system prompt and user prompt |
| **Text** | A text template with support for dynamic `{{variables}}` |
| **Filter** | Routes data to a pass or fail output based on a condition |
| **Math** | Runs an arithmetic operation on two inputs |
| **Merge** | Combines two streams (concat, zip, union, intersect) |
| **API Call** | Makes an HTTP request with configurable method and URL |
| **Note** | Sticky comment for annotating your pipeline |

---

## A few things I'm happy with

**The node abstraction** — every node is just a config passed into a shared `BaseNode` component. Adding a new node type is maybe 20 lines. No copy-pasting boilerplate between files.

**Dynamic handles on the Text node** — when you type `{{variableName}}` in the text field, a new input handle appears on the node automatically. Remove the variable and the handle disappears. It's a small thing but it makes the Text node feel alive.

**DAG validation** — on submit, the backend runs Kahn's topological sort algorithm on the graph. If there's a cycle, it catches it. Results come back in a modal instead of a browser alert — shows node count, edge count, and whether the pipeline is valid.

---

## Stack

- **ReactFlow** — canvas, drag and drop, edge rendering
- **Zustand** — state management for nodes and edges
- **FastAPI** — backend API and DAG detection
- **DM Sans + DM Mono** — fonts

---

## Project layout

```
frontend/src/
├── nodes/
│   ├── BaseNode.jsx    # the shared abstraction everything builds on
│   ├── textNode.jsx    # dynamic variable handles + auto-resize
│   └── ...             # other node types
├── App.js              # canvas + result modal
├── Toolbar.jsx         # draggable sidebar
├── store.js            # zustand state
└── submit.js           # API call to backend

backend/
└── main.py             # pipeline parse endpoint + DAG check
```

---

## Tips

- Press `Delete` to remove a selected node or edge
- Zoom in before connecting handles — the dots are small
- Use three LLM nodes connected in a triangle to test cycle detection
- Variables in the Text node must be valid JS identifiers — `{{my_var}}` works, `{{my-var}}` doesn't
