export const forgotPasswordConfig = {
  email: {
    maxLength: 50,
    minLength: 2,
    required: true,
    value: "",
    label: "Email",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
    },
  },
};

export const resetPasswordConfig = {
  code: {
    maxLength: 6,
    minLength: 6,
    required: true,
    value: "",
    label: "Code",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
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
