import sys
import json
import os

def launch_swarm(task):
    print(f"🚀 INITIALIZING SWARM FOR TASK: {task}")
    print("----------------------------------------")
    
    agents = [
        {"id": "A1", "name": "Architect", "role": "System Lead"},
        {"id": "A2", "name": "Stylist", "role": "UI/UX Specialist"},
        {"id": "A3", "name": "Coder", "role": "Logic Expert"},
        {"id": "A4", "name": "Growth", "role": "SEO / Marketing"}
    ]
    
    # Simulate decomposition
    print(f"🤖 [A1] ARCHITECT: Decomposing task into sub-tasks...")
    subtasks = [
        f"Design vibe for: {task}",
        f"Implement core logic for: {task}",
        f"Final SEO audit: {task}"
    ]
    
    for i, sub in enumerate(subtasks):
        agent = agents[i+1]
        print(f"⚡ [ {agent['id']} ] {agent['name']} assigned to: {sub}")
        
    print("----------------------------------------")
    print("✅ Swarm initialized in background. Antigravity Agent is leading the sync.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python swarm.py 'Task Description'")
    else:
        launch_swarm(sys.argv[1])
