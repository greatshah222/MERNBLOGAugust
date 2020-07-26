import { validate } from '../../../validation/validator';

export const inputReducer = (state, action) => {
  switch (action.type) {
    case 'ONINPUTCHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };

    case 'TOUCHED':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
