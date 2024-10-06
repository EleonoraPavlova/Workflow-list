import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { useActions } from 'common/hooks'
import { DemoTodolist, Todolist } from 'common/types'
import { useCallback, useEffect, useState } from 'react'

import { tasksThunks } from 'services/reducers/tasksSlice'
import { mockTasks } from 'moc/initialState/mockTasks'
import { mockTodolists } from 'moc/initialState/mockTodolists'

export function useTodolistPage({ demo }: { demo: boolean }) {
  const [todosDemo, setTodosDemo] = useState<DemoTodolist[]>([])

  const { addTodolistTC, getTodolistTC } = useActions(todolistsThunks)
  const { getTasksTC } = useActions(tasksThunks)

  const addTodoList = useCallback(
    async (input: string) => {
      await addTodolistTC(input)
    },
    [addTodolistTC]
  )

  useEffect(() => {
    const getTodos = async () => {
      if (demo) {
        const response = mockTodolists
        const todosWithTasks = response.todolists.map((t) => {
          const tasks = mockTasks[t.id]
          return { ...t, tasks }
        })
        setTodosDemo(todosWithTasks)
        return
      }

      const res = await getTodolistTC()
      if (todolistsThunks.getTodolistTC.fulfilled.match(res)) {
        const todolists = res.payload.todolists as Todolist[]
        todolists.forEach((t: Todolist) => {
          getTasksTC(t.id)
        })
      }
    }
    getTodos()
  }, [demo])

  return { addTodoList, todosDemo }
}
