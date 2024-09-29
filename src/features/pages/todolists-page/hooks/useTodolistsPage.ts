import { selectIsLoggedIn } from 'services/reducers/authSlice'
import { tasksThunks } from 'services/reducers/tasksSlice'
import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { useActions } from 'common/hooks'
import { Todolist } from 'common/types'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function useTodolistPage() {
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены

  const { addTodolistTC, getTodolistTC } = useActions(todolistsThunks)
  const { getTasksTC } = useActions(tasksThunks)

  const navigate = useNavigate()

  const addTodoList = useCallback(
    (input: string) => {
      let res = addTodolistTC(input).unwrap()
      console.log('res', res)
      return res
    },
    [addTodolistTC]
  )

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn])

  useEffect(() => {
    const getTodos = async () => {
      const res = await getTodolistTC()
      if (todolistsThunks.getTodolistTC.fulfilled.match(res)) {
        const todolists = res.payload.todolists as Todolist[]
        todolists.forEach((t: Todolist) => {
          getTasksTC(t.id)
        })
      }
    }
    getTodos()
  }, [])

  return { addTodoList }
}
