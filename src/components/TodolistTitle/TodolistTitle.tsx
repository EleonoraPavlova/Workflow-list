import React, { memo } from 'react'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import s from './TodolistTitle.module.scss'
import { TodolistDomain } from 'common/types'
import { EditableSpan } from 'components/editable-span'
import { useActions } from 'common/hooks'
import { todolistsThunks } from 'services/reducers/todolistsSlice'

type Props = {
  todolist: TodolistDomain
  disabledFor: boolean
}

export const TodoListTitle: React.FC<Props> = memo(({ todolist, disabledFor }) => {
  const { title, id, filter } = todolist
  const { removeTodolistTC, updateTodolistTC } = useActions(todolistsThunks)

  const changeTodolistTitle = (title: string) => {
    updateTodolistTC({ todoListId: id, title, filter })
  }

  const removeTodolist = () => {
    removeTodolistTC(id)
  }

  return (
    <>
      <EditableSpan
        value={title}
        onChange={changeTodolistTitle}
        additionalClass={s.additionalClass}
        disabled={disabledFor}
      />
      <IconButton aria-label="delete" size="small" disabled={disabledFor} onClick={removeTodolist}>
        <Delete />
      </IconButton>
    </>
  )
})
