import { selectIsLoggedIn } from 'services/reducers/authSlice'
import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { useActions } from 'common/hooks'
import { Todolist } from 'common/types'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tasksThunks } from 'services/reducers/tasksSlice'
import { startStateTodolists } from 'moc/initialState/todolistsStartState'
import { startStateTasks } from 'moc/initialState/tasksStartState'

export function useTodolistPage({ demo }: { demo: boolean }) {
  let isLoggedIn = useSelector(selectIsLoggedIn)

  const { addTodolistTC, getTodolistTC } = useActions(todolistsThunks)
  const { getTasksTC } = useActions(tasksThunks)

  const navigate = useNavigate()

  const addTodoList = useCallback(
    async (input: string) => {
      await addTodolistTC(input)
    },
    [addTodolistTC]
  )

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      if (demo) {
        const response = startStateTodolists
        response.todolists.forEach((t: Todolist) => {
          const tasksForTodolist = startStateTasks[t.id] || []
          console.log('tasksForTodolist', tasksForTodolist)
        })
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

  return { addTodoList }
}
