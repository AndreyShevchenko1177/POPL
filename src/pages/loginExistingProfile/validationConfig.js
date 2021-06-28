export const signInConfig = {
  email: {
    maxLength: 50,
    minLength: 2,
    required: true,
    value: "",
    regexp: /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    label: "Username/Email",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      regexp: "Email is not valid",
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
