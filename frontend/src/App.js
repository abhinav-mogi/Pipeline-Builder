import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { MathNode } from './nodes/mathNode';
import { MergeNode } from './nodes/mergeNode';
import { ApiNode } from './nodes/apiNode';
import { NoteNode } from './nodes/noteNode';

import useStore, { getNextId } from './store';
import { Toolbar } from './toolbar';
import { submitPipeline } from './submit';
const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  math: MathNode,
  merge: MergeNode,
  api: ApiNode,
  note: NoteNode,
};

function PipelineCanvas() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore();

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });
      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="app-layout">
      <Toolbar />

      <div className="canvas-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode="Delete"
        >
          <Background variant="dots" gap={18} size={1} color="#1e293b" />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const colors = {
                customInput: '#22d3ee', customOutput: '#f472b6',
                llm: '#a78bfa', text: '#fb923c', filter: '#34d399',
                math: '#fbbf24', merge: '#e879f9', api: '#60a5fa', note: '#facc15',
              };
              return colors[n.type] || '#6366f1';
            }}
          />
        </ReactFlow>

        <div className="submit-bar">
          <button className="submit-btn" onClick={() => submitPipeline(nodes, edges)}>
            <span className="submit-btn__icon">▶</span>
            Submit Pipeline
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <PipelineCanvas />
    </ReactFlowProvider>
  );
}