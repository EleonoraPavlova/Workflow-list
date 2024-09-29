import { memo } from 'react'
import { FilterValues, TodolistDomain } from 'common/types'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'services/reducers/todolistsSlice'
import { FlexContainer } from 'components/flex-container'
import { Button } from 'components'

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
    <FlexContainer gap="10px">
      <Button variant={filter === 'all' ? 'primary' : 'standart'} onClick={() => changeTodoListFilter(id, 'all')}>
        All
      </Button>
      <Button
        variant={filter === 'incomplete' ? 'info' : 'standart'}
        onClick={() => changeTodoListFilter(id, 'incomplete')}>
        Incomplete
      </Button>
      <Button
        variant={filter === 'completed' ? 'green' : 'standart'}
        onClick={() => changeTodoListFilter(id, 'completed')}>
        Completed
      </Button>
    </FlexContainer>
  )
})
