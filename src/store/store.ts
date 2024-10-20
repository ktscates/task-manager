import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
}
const useStore = create<TaskState>((set: any) => ({
  tasks: [],
  addTask: (task: Task) =>
    set((state: TaskState) => ({ tasks: [...state.tasks, task] })),
}));

export default useStore;
