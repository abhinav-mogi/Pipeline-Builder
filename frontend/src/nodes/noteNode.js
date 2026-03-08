import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a comment here...');
  return (
    <BaseNode id={id} title="Note" icon="📌" accentColor="#facc15" minWidth={180}>
      <textarea
        className="node-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        style={{ resize: 'vertical', fontStyle: 'italic', color: '#e2c84b' }}
        placeholder="Write a note..."
      />
    </BaseNode>
  );
};
