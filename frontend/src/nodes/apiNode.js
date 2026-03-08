import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1/');

  const methodColor = { GET: '#34d399', POST: '#60a5fa', PUT: '#fbbf24', DELETE: '#f87171' }[method];

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="#60a5fa"
      inputs={[
        { id: 'headers', label: 'headers' },
        { id: 'body', label: 'body' },
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
      minWidth={260}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <select
          className="node-select"
          style={{ width: 80, color: methodColor, fontWeight: 700 }}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <label className="node-label">URL</label>
      <input
        className="node-input mono"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
      />
    </BaseNode>
  );
};
