import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');
  const [separator, setSeparator] = useState(data?.separator || '\\n');
  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      accentColor="#e879f9"
      inputs={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <label className="node-label">Strategy</label>
      <select
        className="node-select"
        value={strategy}
        onChange={(e) => setStrategy(e.target.value)}
      >
        {['concat', 'zip', 'union', 'intersect'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      {strategy === 'concat' && (
        <>
          <label className="node-label">Separator</label>
          <input
            className="node-input mono"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
        </>
      )}
    </BaseNode>
  );
};
