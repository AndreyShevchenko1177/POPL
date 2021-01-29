export const signInConfig = {
  username: {
    maxLength: 20,
    minLength: 2,
    required: true,
    value: "",
    label: "Username/Email",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
    },
  },
  password: {
    maxLength: 20,
    minLength: 3,
    required: true,
    label: "Password",
    value: "",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
    },
  },
};

export const signUpConfig = {
  username: {
    maxLength: 20,
    minLength: 2,
    required: true,
    value: "",
    label: "Username",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
    },
  },
  email: {
    maxLength: 20,
    minLength: 2,
    required: true,
    value: "",
    label: "Email",
    regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      regexp: "Email is not valid",
    },
  },
  password: {
    maxLength: 20,
    minLength: 3,
    required: true,
    label: "Password",
    value: "",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
    },
  },
  confirmPassword: {
    maxLength: 20,
    minLength: 3,
    required: true,
    label: "Confirm password",
    confirmPassword: true,
    value: "",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      confirmPassword: "should be equal to password",
    },
  },
};
