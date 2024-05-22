import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
}

type State =  {
  tasks: Task[];
  draggedTask: string | null;
}

type Actions = {
  addTask: (title: string, description?: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, status: Status) => void;
  dragTask: (id: string | null) => void;
}

const initialState: State = {
  tasks: [],
  draggedTask: null
};

const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      addTask: (title, description) => {
        set((state) => ({
          tasks: [...state.tasks, { id: uuidv4(), title, description, status: 'TODO' }]
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }));
      },
      updateTask: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task))
        }));
      },
      dragTask: (id) => {
        set({ draggedTask: id })
      }
    }),
    { name: "task-store", storage: createJSONStorage(() => localStorage) }
  )
);

export default useTaskStore;