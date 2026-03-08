import React from 'react';
import { BaseNode } from '../BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = React.useState(data?.model || 'gpt-4o');
  const [temp, setTemp] = React.useState(data?.temperature ?? 0.7);

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      accentColor="#a78bfa"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <label className="node-label">Model</label>
      <select
        className="node-select"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-5-sonnet', 'gemini-1.5-pro'].map(
          (m) => <option key={m}>{m}</option>
        )}
      </select>
      <label className="node-label">Temperature: {temp}</label>
      <input
        type="range"
        className="node-slider"
        min="0"
        max="1"
        step="0.1"
        value={temp}
        onChange={(e) => setTemp(parseFloat(e.target.value))}
      />
    </BaseNode>
  );
};
