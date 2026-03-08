import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.operation || '+');
  return (
    <BaseNode
      id={id}
      title="Math"
      icon="➗"
      accentColor="#fbbf24"
      inputs={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      outputs={[{ id: 'result', label: 'result' }]}
    >
      <label className="node-label">Operation</label>
      <select className="node-select" value={op} onChange={(e) => setOp(e.target.value)}>
        {['+', '-', '×', '÷', 'mod', 'pow', 'min', 'max'].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <div className="node-preview">{`a ${op} b → result`}</div>
    </BaseNode>
  );
};
