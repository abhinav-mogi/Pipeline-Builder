import React from 'react';
export const SubmitButton = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit">Submit</button>
        </div>
    );
}
export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const { num_nodes, num_edges, is_dag } = await response.json();

    const dagStatus = is_dag
      ? '✅ Valid DAG — no cycles detected'
      : '⚠️  Not a DAG — cycles detected';

    alert(
      `Pipeline Analysis\n` +
      `─────────────────\n` +
      `Nodes : ${num_nodes}\n` +
      `Edges : ${num_edges}\n` +
      `${dagStatus}`
    );
  } catch (err) {
    alert(`Failed to submit pipeline:\n${err.message}`);
  }
};
