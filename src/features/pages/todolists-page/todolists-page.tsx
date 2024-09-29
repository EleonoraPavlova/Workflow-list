import { Box } from '@mui/material'
import { AddItemForm } from '../../../components/add-item-form'
import { useTodolistRender } from './hooks/useTodolistsPage'
import { Todolists } from 'components/todolists/todolists'

type Props = {
  demo?: boolean 
  lightMode: boolean
}

export const TodolistsPage = ({ demo = false, lightMode }: Props) => {
  const { addTodoList } = useTodolistRender()

  return (
    <>
      <Box>
        <Box sx={{ padding: '45px 10px 5px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {lightMode ? (
            <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
          ) : (
            <Box
              sx={{
                width: '280px',
                height: '70px',
                backgroundColor: '#1e1e1e',
                borderRadius: '5px',
                padding: '15px 0 15px 45px',
              }}>
              <AddItemForm addTask={addTodoList} label={"Todolist's name"} />
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', overflow: 'auto', padding: '0 0 40px 5px' }}>
        <Todolists />
      </Box>
    </>
  )
}
