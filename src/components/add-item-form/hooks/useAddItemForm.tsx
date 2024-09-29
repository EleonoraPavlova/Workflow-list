import { ResponseData } from 'common/types'
import { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'

export function useAddItemForm(addTask: (taskName: string) => Promise<any>) {
  let [error, setError] = useState<string | null>(null)
  let [inputValue, setInputValue] = useState<string>('')

  const addItemHandler = useCallback(
    (title: string) => {
      if (/[a-zA-Zа-яА-ЯёЁ0-9]/i.test(title) && title.length >= 3) {
        addTask(title)
          .then(() => setInputValue(''))
          .catch((e: ResponseData) => {
            if ('fieldsErrors' in e) {
              setError(e.messages[0])
            }
          })
      } else {
        setError('min 3 characters')
      }
    },
    [addTask, setInputValue, setError, inputValue]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setInputValue(value)
      if (value.length > 100) setError('max 100 characters')
    },
    [setInputValue]
  )

  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) setError(null)
      if (e.key === 'Enter') addItemHandler(inputValue)
    },
    [setError, addItemHandler]
  )

  return { error, inputValue, onChangeHandler, onKeyDownHandler, addItemHandler, setError }
}
