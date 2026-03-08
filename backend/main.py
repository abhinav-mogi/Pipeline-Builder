from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes=pipeline.nodes
    edges=pipeline.edges
    num_nodes=len(nodes)
    num_edges=len(edges)
    is_dag=check_is_dag(nodes, edges)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}


def check_is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """Check if the graph formed by nodes and edges is a Directed Acyclic Graph."""
    if not nodes:
        return True

    node_ids = {node["id"] for node in nodes}

    adj = defaultdict(list)
    in_degree={node_id: 0 for node_id in node_ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Kahn's algorithm for topological sort
    queue = deque(node_id for node_id, deg in in_degree.items() if deg == 0)
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited all nodes, no cycle exists , it's a DAG
    return visited_count == len(node_ids)

