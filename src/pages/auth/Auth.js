import CSnackbar from "../../components/SnackBar";

function Auth({ children }) {
  return (
    <>
      <CSnackbar />
      {children}
    </>
  );
}

export default Auth;
