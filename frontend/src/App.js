import React, { useCallback, useRef ,useState} from 'react';
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

function ResultModal({ result, onClose }) {
  if (!result) return null;

  const { num_nodes, num_edges, is_dag, error } = result;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={`modal-header ${error ? 'modal-header--error' : is_dag ? 'modal-header--success' : 'modal-header--warn'}`}>
          <span className="modal-header__icon">
            {error ? '❌' : is_dag ? '✅' : '⚠️'}
          </span>
          <span className="modal-header__title">
            {error ? 'Submission Failed' : 'Pipeline Analysis'}
          </span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {error ? (
            <p className="modal-error-text">{error}</p>
          ) : (
            <>
              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="modal-stat__value">{num_nodes}</span>
                  <span className="modal-stat__label">Nodes</span>
                </div>
                <div className="modal-stat-divider" />
                <div className="modal-stat">
                  <span className="modal-stat__value">{num_edges}</span>
                  <span className="modal-stat__label">Edges</span>
                </div>
              </div>

              <div className={`modal-dag-badge ${is_dag ? 'modal-dag-badge--valid' : 'modal-dag-badge--invalid'}`}>
                <span className="modal-dag-badge__dot" />
                <span className="modal-dag-badge__text">
                  {is_dag
                    ? 'Valid DAG — no cycles detected'
                    : 'Not a DAG — cycle detected'}
                </span>
              </div>

              <p className="modal-hint">
                {is_dag
                  ? 'Your pipeline has a valid execution order and can be run.'
                  : 'Cycles prevent deterministic execution. Remove the looping connection to fix this.'}
              </p>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Canvas ──────────────────────────────────────── */
function PipelineCanvas() {
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalResult, setModalResult] = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore();

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type || !rfInstance) return;
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = rfInstance.screenToFlowPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
    addNode(type, position);
  }, [rfInstance, addNode]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await submitPipeline(nodes, edges);
      setModalResult(result);
    } catch (err) {
      setModalResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

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
          onInit={setRfInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode="Delete"
        >
          <Background variant="dots" gap={18} size={1} color="#1e293b" />
          <Controls />
          <MiniMap
            nodeColor={(n) => ({
              customInput: '#22d3ee', customOutput: '#f472b6',
              llm: '#a78bfa', text: '#fb923c', filter: '#34d399',
              math: '#fbbf24', merge: '#e879f9', api: '#60a5fa', note: '#facc15',
            }[n.type] || '#6366f1')}
          />
        </ReactFlow>

        <div className="submit-bar">
          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><span className="submit-btn__spinner" /> Analyzing…</>
              : <><span className="submit-btn__icon">▶</span> Submit Pipeline</>}
          </button>
        </div>
      </div>

      <ResultModal result={modalResult} onClose={() => setModalResult(null)} />
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
