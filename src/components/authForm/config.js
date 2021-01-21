export const authConfig = {
  signInPage: [
    {
      fieldName: "username",
      placeHolder: "Username/Email",
      required: true,
    },
    {
      fieldName: "password",
      placeHolder: "password",
      required: true,
    },
  ],
  signUpPage: [
    {
      fieldName: "username",
      placeHolder: "Username *",
      required: true,
    },
    {
      fieldName: "email",
      placeHolder: "Email *",
      required: true,
    },
    {
      fieldName: "password",
      placeHolder: "Password *",
      required: true,
    },
    {
      fieldName: "confirmPassword",
      placeHolder: "Confirm password *",
      required: true,
    },
  ],
};
