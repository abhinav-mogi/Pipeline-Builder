import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

let nodeIdCounter = 0;
export const getNextId = (type) => `${type}_${++nodeIdCounter}`;

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  onConnect: (connection) =>
    set({ edges: addEdge({ ...connection, animated: true }, get().edges) }),

  addNode: (type, position) => {
    const id = getNextId(type);
    const newNode = {
      id,
      type,
      position,
      data: { label: `${type} Node` },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
}));

export default useStore;
