import { useTodolistPage } from './hooks/useTodolistsPage'
import { AddItemForm } from 'components'
import { Todolists } from 'components/todolists'
import s from './todolist-page.module.scss'
import { FlexContainer, Page } from 'common/ui'

type Props = {
  lightMode: boolean
  demo: boolean
}

export const TodolistsPage = ({ lightMode, demo }: Props) => {
  const { addTodoList } = useTodolistPage({ demo })

  return (
    <Page>
      <FlexContainer gap="30px" fd="column">
        <FlexContainer jc="center">
          <div className={lightMode ? '' : s.addItemForm}>
            <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
          </div>
        </FlexContainer>
        <Todolists demo={demo} />
      </FlexContainer>
    </Page>
  )
}
