import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');
  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      accentColor="#34d399"
      inputs={[{ id: 'data', label: 'data' }]}
      outputs={[
        { id: 'pass', label: 'pass' },
        { id: 'fail', label: 'fail' },
      ]}
    >
      <label className="node-label">Condition</label>
      <input
        className="node-input mono"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="e.g. value > 0"
      />
    </BaseNode>
  );
};
