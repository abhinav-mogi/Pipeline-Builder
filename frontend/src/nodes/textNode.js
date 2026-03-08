import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../BaseNode';

const VAR_REGEX = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;

function extractVariables(text) {
  const vars = new Set();
  let match;
  const regex = new RegExp(VAR_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1].trim());
  }
  return [...vars];
}

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Hello, {{name}}!');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [text, autoResize]);

  // Compute dynamic node width based on longest line
  const longestLine = Math.max(...text.split('\n').map((l) => l.length), 10);
  const dynamicWidth = Math.max(220, Math.min(520, longestLine * 8 + 48));

  return (
    <div
      className="base-node"
      style={{ minWidth: dynamicWidth, borderTopColor: '#fb923c', width: dynamicWidth }}
    >
      {variables.map((varName, i) => {
        const topPct = `${((i + 1) / (variables.length + 1)) * 100}%`;
        return (
          <div key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              className="base-handle"
              style={{ top: topPct, background: '#fb923c', borderColor: '#fb923c' }}
            />
            <span
              className="handle-label left-label"
              style={{ top: `calc(${topPct} - 9px)` }}
            >
              {varName}
            </span>
          </div>
        );
      })}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="base-handle"
        style={{ top: '50%', background: '#fb923c', borderColor: '#fb923c' }}
      />
      <span className="handle-label right-label" style={{ top: 'calc(50% - 9px)' }}>
        text
      </span>

      <div className="base-node-header" style={{ borderBottomColor: '#fb923c33' }}>
        <span className="node-icon">📝</span>
        <span className="node-title" style={{ color: '#fb923c' }}>Text</span>
      </div>

      <div className="base-node-body">
        <label className="node-label">
          Content{' '}
          <span style={{ color: '#64748b', fontWeight: 400 }}>
            (use {'{{var}}'} for inputs)
          </span>
        </label>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          rows={1}
          style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
        />
        {variables.length > 0 && (
          <div className="var-chips">
            {variables.map((v) => (
              <span key={v} className="var-chip">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
