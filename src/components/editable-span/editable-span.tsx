import { Box, TextField } from '@mui/material'
import { ChangeEvent, useState, KeyboardEvent, memo } from 'react'

type Props = {
  value: string
  additionalClass: string
  disabled?: boolean
  isDone?: boolean | undefined
  onChange: (input: string) => void
}

export const EditableSpan = memo(({ value, isDone, disabled, additionalClass, onChange }: Props) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [input, setInput] = useState<string>('')

  const activateEditMode = () => {
    if (!isDone) {
      setEditMode(true)
      setInput(value)
    }
  }

  const activateViewMode = () => {
    setEditMode(false)
    onChange(input)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInput(e.currentTarget.value)
      setEditMode(false)
      onChange(input)
    }
  }

  return editMode ? (
    <TextField
      value={input}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      onKeyDown={onKeyDownHandler}
      autoFocus
      variant="standard"
      disabled={disabled}
    />
  ) : (
    <Box
      component="span"
      onDoubleClick={activateEditMode}
      sx={{ textTransform: 'capitalize', wordBreak: 'break-all', lineHeight: '1.5' }}
      className={additionalClass}>
      {value}
    </Box>
  )
})
