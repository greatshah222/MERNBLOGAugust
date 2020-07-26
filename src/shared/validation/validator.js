const REQUIRED = 'REQUIRED';
const FILE = 'FILE';
const EMAIL = 'EMAIL';
const MIN_LENGTH = 'MIN_LENGTH';
const MAX_LENGTH = 'MAX_LENGTH';
export const VALIDATOR_REQUIRE = () => ({ type: REQUIRED });
export const VALIDATOR_MINLENGTH = (value) => ({
  type: MIN_LENGTH,
  value,
});
export const VALIDATOR_MAXLENGTH = (value) => ({
  type: MAX_LENGTH,
  value,
});
export const VALIDATOR_EMAIL = () => ({ type: EMAIL });
export const VALIDATOR_FILE = () => ({ type: FILE });

export const validate = (input, validators) => {
  const inputLength = input.trim().length;
  const emailPattern = /^\S+@\S+\.\S+$/.test(input);
  // const filePattern = /^.*\.[^\\]/(input);

  return validators.every(
    ({ type, value }) =>
      (type === REQUIRED && inputLength > 0) ||
      (type === MIN_LENGTH && inputLength >= value) ||
      (type === EMAIL && emailPattern) ||
      type === FILE ||
      (type === MAX_LENGTH && inputLength <= value)
  );
};
