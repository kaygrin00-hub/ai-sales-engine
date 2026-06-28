const memory = [];

export function saveTask(task) {
  memory.push({
    ...task,
    id: memory.length + 1,
    createdAt: new Date().toISOString()
  });
  console.log(`✅ Task saved. Total: ${memory.length}`);
}

export function getTasks() {
  return memory;
}

export function getTaskById(id) {
  return memory.find(t => t.id === id);
}

export function clearMemory() {
  memory.length = 0;
}
