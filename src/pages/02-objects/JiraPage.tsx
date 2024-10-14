import { useShallow } from 'zustand/shallow';
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/task/task.store';

export const JiraPage = () => {
  // const tasks = useTaskStore((state) => state.tasks)
  // const tasksProgress = useTaskStore((state) => state.getTaskByStatus('in-progress'))
  //const tasksDone = useTaskStore((state) => state.getTaskByStatus('done'))
  //const tasksOpen = useTaskStore((state) => state.getTaskByStatus('open'))

  // const getTaskByStatus = useTaskStore((state) => state.getTaskByStatus);
  // const tasksProgress = getTaskByStatus('in-progress')
  // const tasksDone = getTaskByStatus('done')
  // const tasksOpen= getTaskByStatus('open')
  const tasksOpen = useTaskStore(useShallow((state) => state.getTaskByStatus('open')))
  const tasksProgress = useTaskStore(useShallow((state) => state.getTaskByStatus('in-progress')))
  const tasksDone = useTaskStore(useShallow((state) => state.getTaskByStatus('done')))
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' status='open' tasks={tasksOpen} />
          
          <JiraTasks title='Avanzando' status='in-progress' tasks={tasksProgress} />
          
          <JiraTasks title='Terminadas' status='done' tasks={tasksDone} />
      </div>
    </>
  );
};