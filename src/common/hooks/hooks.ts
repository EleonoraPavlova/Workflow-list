import { useMemo } from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { AppDispatch, AppRootState } from 'services/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch)
  }, [actions, dispatch])
}


type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
type ReplaceReturnType<T, TNewReturn> = T extends (...args: any[]) => infer R
  ? IsValidArg<Extract<T, (...args: any[]) => any>> extends true
    ? (...args: Parameters<Extract<T, (...args: any[]) => any>>) => TNewReturn
    : () => TNewReturn
  : never

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}
