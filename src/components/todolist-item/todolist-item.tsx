import  { memo, useCallback } from 'react'
import { Box } from '@mui/material'
import { AddItemForm } from 'components/add-item-form'
import { Task, TodolistDomain } from 'common/types'
import { Buttons } from 'components/buttons'
import { TodoListTitle } from 'components/TodolistTitle/TodolistTitle'
import { useActions } from 'common/hooks'
import { tasksThunks } from 'services/reducers/tasksSlice'
import { Tasks } from 'components/tasks'



type Props = {
  todolist: TodolistDomain
  tasksForTodolist: Task[]
  demo: boolean
}

export const TodolistItem = memo(({ demo = false, todolist, tasksForTodolist }: Props) => {
  const { entityStatus, id } = todolist
  const { addTaskTC } = useActions(tasksThunks)
  let disabledFor = entityStatus === 'loading'

  const addTask = useCallback(
    (title: string) => {
      return addTaskTC({ title, todoListId: id }).unwrap()
    },
    [addTaskTC, id]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0px',
        }}>
        <TodoListTitle disabledFor={disabledFor} todolist={todolist} />
      </Box>
      <Box sx={{ margin: '0 auto' }}>
        <AddItemForm addTask={addTask} disabled={disabledFor} label={'Type here...'} />
        <Tasks tasksForTodolist={tasksForTodolist} />
        <Box sx={{ display: 'flex', gap: '15px' }}>
          <Buttons todolist={todolist} />
        </Box>
      </Box>
    </Box>
  )
})

