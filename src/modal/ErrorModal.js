import { Alert, Snackbar } from "@mui/material";
 
export default function ErrorModal({ setErrorModal, error }) {
  return (
    <>
      <Snackbar
        open={true}
        key={"top" + "center"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => {
          setErrorModal((prev) => ({ ...prev, state: false }));
        }}
      >
        <Alert
          onClose={() => {
            setErrorModal((prev) => ({ ...prev, state: false }));
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}