import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces/task.interface";
import { devtools } from "zustand/middleware";
import {v4 as uuidv4} from 'uuid'
import { immer } from "zustand/middleware/immer";

interface TaskState {
    tasks: Record<string, Task> // {[key:string]: Task}
    draggingTaskId?: string
    getTaskByStatus: (status: TaskStatus) => Task[]
    setDraggingTaskId: (taskId: string) => void
    removeDraggingTaskId: () => void
    changeProgress: (taskId: string, status: TaskStatus) => void
    onTaskDrop: (status: TaskStatus) => void
    addTask: (title:string, status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    tasks: {
        'ABC-1' : {id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2' : {id: 'ABC-2', title: 'Task 2', status: 'open'},
        'ABC-3' : {id: 'ABC-3', title: 'Task 3', status: 'in-progress'},
        'ABC-4' : {id: 'ABC-4', title: 'Task 4', status: 'open'},
    },
    getTaskByStatus:(status: TaskStatus) => {
        const tasks = get().tasks
        return Object.values(tasks).filter(task => task.status === status);
    },
    setDraggingTaskId: (taskId: string) => {
        set({draggingTaskId: taskId})
    },
    removeDraggingTaskId: () => {
        set({draggingTaskId: undefined})
    },
    changeProgress: (taskId: string, status: TaskStatus) => {
        const task = get().tasks[taskId]
        task.status = status
        // forma nativa
        set(()=> ({
            tasks: {...get().tasks, [taskId]: task}
        }))
        // immer
        // set(state => {
        //     state.tasks[taskId] = {
        //         ...state.tasks[taskId],
        //         status
        //     }
        // })
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId
        if(!taskId) return
        get().changeProgress(taskId, status)
        get().removeDraggingTaskId()
    },
    addTask: (title: string, status: TaskStatus) => {
        const newTask = {
            id: uuidv4(),
            title,
            status
        }

        // forma nativa
        set(state=>({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask
            }
        }))

        // immer
        // set(state => {
        //     state.tasks[newTask.id] = newTask
        // })
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(
        immer(storeApi)
    )
)