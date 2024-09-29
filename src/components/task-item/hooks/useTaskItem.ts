import { TaskStatuses } from 'common/enums'
import { useActions } from 'common/hooks'
import { Task } from 'common/types'
import { ChangeEvent, useCallback } from 'react'
import { tasksThunks } from 'services/reducers/tasksSlice'

export function useTaskItem(task: Task) {
  let { todoListId, id } = task
  const { removeTaskTC, updateTaskTC } = useActions(tasksThunks)

  const onRemoveHandler = useCallback(() => {
    removeTaskTC({ todoListId, taskId: id })
  }, [todoListId, id])

  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let currentStatus = e.currentTarget.checked
      const newStatus = currentStatus ? TaskStatuses.Completed : TaskStatuses.New
      updateTaskTC({ todoListId, taskId: id, domainModel: { status: newStatus } })
    },
    [todoListId, id]
  )

  const changeTaskTitle = useCallback(
    (title: string) => {
      updateTaskTC({ todoListId, taskId: id, domainModel: { title } })
    },
    [todoListId, id]
  )
  return { onRemoveHandler, changeTaskStatus, changeTaskTitle }
}
