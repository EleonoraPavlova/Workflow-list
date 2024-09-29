import { IconButton, TextField } from '@mui/material'
import s from './addItemForm.module.scss'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { useAddItemForm } from './hooks/useAddItemForm'

type Props = {
  disabled?: boolean
  label: string
  addTask: (inputValue: string) => Promise<any>
}

export const AddItemForm = ({ disabled = false, label, addTask }: Props) => {
  const { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler, setError } = useAddItemForm(addTask)

  const setErrorBlurHandler = () => {
    setError(null)
  }

  return (
    <div className={s.addItemForm}>
      <TextField
        type="text"
        label={label}
        value={inputValue}
        onChange={onChangeHandler}
        onBlur={setErrorBlurHandler}
        onKeyDown={onKeyDownHandler}
        variant={'outlined'}
        error={!!error}
        helperText={error}
        size="small"
        sx={{ width: '198px' }}
      />
      <IconButton onClick={() => addItemHandler(inputValue)}>
        <AddTaskIcon fontSize="small" color="success" />
      </IconButton>
    </div>
  )
}
