export const signInConfig = {
  email: {
    maxLength: 50,
    minLength: 2,
    required: true,
    value: "",
    regexp: /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    label: "enter the number of profiles you’d like to create below",
    errors: {
      minLength: "min length error",
      maxLength: "max length error",
      required: "should be not empty",
      regexp: "Email is not valid",
    },
  },
};
