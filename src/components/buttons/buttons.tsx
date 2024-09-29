import { memo } from 'react'
import {  Button } from '@mui/material'
import { FilterValues, TodolistDomain } from 'common/types'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { FlexContainer } from 'components/flex-container'

type Props = {
  todolist: TodolistDomain
}

export const Buttons = memo(({ todolist }: Props) => {
  const { filter, title, id } = todolist
  const { updateTodolistTC } = useActions(todolistsThunks)

  const changeTodoListFilter = (todoListId: string, filter: FilterValues) => {
    updateTodolistTC({ todoListId, title, filter })
  }

  return (
    <FlexContainer gap='10px' >
      <Button
        size="small"
        variant={filter === 'all' ? 'contained' : 'text'}
        children={'All'}
        onClick={() => changeTodoListFilter(id, 'all')}
      />
      <Button
        size="small"
        color={'primary'}
        variant={filter === 'incomplete' ? 'contained' : 'text'}
        children={'Incomplete'}
        onClick={() => changeTodoListFilter(id, 'incomplete')}
      />
      <Button
        size="small"
        color={'secondary'}
        variant={filter === 'completed' ? 'contained' : 'text'}
        children={'Completed'}
        onClick={() => changeTodoListFilter(id, 'completed')}
      />
    </FlexContainer>
  )
})
