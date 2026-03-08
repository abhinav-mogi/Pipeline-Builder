import React from 'react';
const nodePalette = [
  { type: 'customInput', label: 'Input',  icon: '⬇️', color: '#22d3ee' },
  { type: 'customOutput',label: 'Output', icon: '⬆️', color: '#f472b6' },
  { type: 'llm',         label: 'LLM',   icon: '🤖', color: '#a78bfa' },
  { type: 'text',        label: 'Text',  icon: '📝', color: '#fb923c' },
  { type: 'filter',      label: 'Filter',icon: '🔍', color: '#34d399' },
  { type: 'math',        label: 'Math',  icon: '➗', color: '#fbbf24' },
  { type: 'merge',       label: 'Merge', icon: '🔀', color: '#e879f9' },
  { type: 'api',         label: 'API',   icon: '🌐', color: '#60a5fa' },
  { type: 'note',        label: 'Note',  icon: '📌', color: '#facc15' },
];

export const Toolbar = () => {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="toolbar">
      <div className="toolbar-header">
        <span className="toolbar-logo">⚡</span>
        <span className="toolbar-brand">VectorShift</span>
      </div>
      <p className="toolbar-hint">Drag nodes onto the canvas</p>
      <div className="toolbar-nodes">
        {nodePalette.map(({ type, label, icon, color }) => (
          <div
            key={type}
            className="toolbar-item"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            style={{ borderLeftColor: color }}
          >
            <span className="toolbar-item-icon">{icon}</span>
            <span className="toolbar-item-label">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
