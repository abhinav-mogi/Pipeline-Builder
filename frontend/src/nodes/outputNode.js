import React from 'react';
import { BaseNode } from '../BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = React.useState(data?.outputName || 'output');
  const [type, setType] = React.useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="⬆️"
      accentColor="#f472b6"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <label className="node-label">Name</label>
      <input
        className="node-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="node-label">Type</label>
      <select
        className="node-select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {['Text', 'File', 'Image', 'Number', 'Boolean'].map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </BaseNode>
  );
};
