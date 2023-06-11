import { useCallback, useEffect, useRef, useState } from 'react';

type Callback = () => void;
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>> 
type DispatchWithCallback<T> = (value: PartialRecord<keyof T, any>, callback?: Callback) => void;

function useStateCallback<T>(initialState: T | (() => T)): [T, DispatchWithCallback<T>] {
  const [state, _setState] = useState(initialState);

  const callbackRef = useRef<Callback>();

  const setState = useCallback((data: PartialRecord<keyof T, any>, callback?: Callback): void => {
    callbackRef.current = callback;
    _setState(state => ({ ...state, ...data }));
  }, []);

  useEffect(() => {
    callbackRef.current?.();
  }, [state]);

  return [state, setState];
}

export default useStateCallback;
