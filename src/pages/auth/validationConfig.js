export const signInConfig = {
  username: {
    id: 0,
    title: "username",
    maxLength: 50,
    value: null,
    required: true,
    errors: {
      maxLegnth: "User name should be less than 30 symbols",
      value: "This field can not be empty",
    },
  },
  password: {
    id: 1,
    title: "password",
    maxLength: 30,
    value: null,
    required: true,
    errors: {
      maxLegnth: "Password should be less than 30 symbols",
      value: "This field can not be empty",
    },
  },
};

export const signUpConfig = {
  username: {
    id: 0,
    title: "username",
    maxLength: 50,
    value: null,
    required: true,
    errors: {
      maxLegnth: "User name should be less than 30 symbols",
      value: "This field can not be empty",
    },
  },
  email: {
    id: 0,
    title: "email",
    maxLength: 50,
    value: null,
    required: true,
    regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    errors: {
      maxLegnth: "User name should be less than 30 symbols",
      value: "This field can not be empty",
      regexp: "Email is not valid",
    },
  },
  password: {
    id: 1,
    title: "password",
    maxLength: 30,
    value: null,
    required: true,
    errors: {
      maxLegnth: "Password should be less than 30 symbols",
      value: "This field can not be empty",
    },
  },
  confirmPassword: {
    id: 1,
    title: "confirmPassword",
    maxLength: 30,
    value: null,
    required: true,
    compare: true,
    errors: {
      maxLegnth: "confirm password should be less than 30 symbols",
      compareError: "confirm password is not equal to password",
      value: "This field can not be empty",
    },
  },
};
