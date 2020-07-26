import { useReducer, useCallback } from 'react';
import { formReducer } from '../UI/INPUT/Reducer/FormReducer';

export const useForm = (inputs, isValid) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs,
    isValid,
  });
  // they are responsible for input change in the component and as well check their validity and overall form value change. this input component is only responsible for one input value change wheras the form component is responsible for all teh form value. use callback to prevent infinite loop
  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', id, value, isValid });
    dispatch({ type: 'CHECK_FOR_VALIDITY', isValid });
  }, []);

  return [state, InputHandler];
};
