import { useTodolistPage } from './hooks/useTodolistsPage'
import { AddItemForm, FlexContainer } from 'components'
import { Todolists } from 'components/todolists'
import s from './todolist-page.module.scss'

type Props = {
  demo?: boolean
  lightMode: boolean
}

export const TodolistsPage = ({ demo = false, lightMode }: Props) => {
  const { addTodoList } = useTodolistPage()

  return (
    <FlexContainer gap="34px" fd="column">
      <FlexContainer jc="center">
        <div className={lightMode ? '' : s.addItemForm}>
          <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
        </div>
      </FlexContainer>
      <Todolists />
    </FlexContainer>
  )
}
