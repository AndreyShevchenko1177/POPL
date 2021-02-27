export const signInConfig = {
  username: {
    maxLength: 50,
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
    maxLength: 50,
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
    maxLength: 50,
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
    maxLength: 50,
    minLength: 3,
    required: true,
    value: "",
    label: "Email",
    // regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexp: /@/,
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      regexp: "Email is not valid",
    },
  },
  password: {
    maxLength: 50,
    minLength: 2,
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
    maxLength: 50,
    minLength: 2,
    required: true,
    label: "Confirm password",
    equal: true,
    value: "",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      equal: "should be equal to password",
    },
  },
};
