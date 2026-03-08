import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#6366f1',
  inputs = [],
  outputs = [],
  children,
  minWidth = 200,
  style = {},
}) => {
  return (
    <div className="base-node" style={{ minWidth, borderTopColor: accentColor, ...style }}>

      {inputs.length > 0 && (
        <div className="handle-section handle-section--inputs">
          {inputs.map((input) => (
            <div key={input.id} className="handle-row handle-row--left">
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${input.id}`}
                style={{ background: accentColor, borderColor: accentColor }}
              />
              <span className="handle-tag">{input.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="base-node-header" style={{ borderBottomColor: `${accentColor}40` }}>
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title" style={{ color: accentColor }}>{title}</span>
      </div>

      {children && (
        <div className="base-node-body">{children}</div>
      )}

      {outputs.length > 0 && (
        <div className="handle-section handle-section--outputs">
          {outputs.map((output) => (
            <div key={output.id} className="handle-row handle-row--right">
              <span className="handle-tag">{output.label}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={`${id}-${output.id}`}
                style={{ background: accentColor, borderColor: accentColor }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};