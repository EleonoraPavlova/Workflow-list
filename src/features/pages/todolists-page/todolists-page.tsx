import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTodolistPage } from './hooks/useTodolistsPage'
import { AddItemForm } from 'components'
import { Todolists } from 'components/todolists'
import { FlexContainer, Page } from 'common/ui'
import { Typography } from '@mui/material'
import { selectIsLoggedIn } from 'services/reducers/authSlice'
import s from './todolist-page.module.scss'

type Props = {
  lightMode: boolean
  demo: boolean
}

export const TodolistsPage = ({ lightMode, demo }: Props) => {
  const { todosDemo, addTodoList } = useTodolistPage({ demo })
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn && !demo) navigate('/login')
  }, [isLoggedIn])

  return (
    <Page>
      <FlexContainer gap="30px" fd="column">
        <FlexContainer jc="center">
          <div className={lightMode ? '' : s.addItemForm}>
            <AddItemForm addTask={addTodoList} label={"Collection's name"} />
          </div>
        </FlexContainer>
        {demo && <Typography sx={{ color: '#8c61ff' }}>limited functionality in demo</Typography>}
        <Todolists demo={demo} todosDemo={todosDemo} />
      </FlexContainer>
    </Page>
  )
}
