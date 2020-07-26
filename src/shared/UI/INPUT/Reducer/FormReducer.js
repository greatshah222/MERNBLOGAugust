export const formReducer = (state, action) => {
  const { type, id, value, isValid, inputs } = action;

  switch (type) {
    case 'INPUT_CHANGE':
      // since we havre to change the value of whole input of that form we are not comying the original state. that is why wehave [id]:{value,isValid}

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [id]: { value, isValid },
        },
      };
    case 'CHECK_FOR_VALIDITY':
      const totalFormValid = Object.values(state.inputs).every(
        (el) => el.isValid
      );
      return {
        ...state,
        isValid: totalFormValid,
      };

    case 'FETCH_DATA_SUCCESS': {
      return {
        inputs,
        isValid,
      };
    }
    default:
      return state;
  }
};
