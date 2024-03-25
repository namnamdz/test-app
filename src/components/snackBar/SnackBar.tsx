// THIRD-PARTY
import CloseIcon from "@mui/icons-material/Close";
import MuiSnackbar from "@mui/material/Snackbar";
import {
  Alert,
  Button,
  Fade,
  Grow,
  IconButton,
  Slide,
  SlideProps,
} from "@mui/material";
import { SyntheticEvent } from "react";

// PROJECT IMPORTS
import { KeyedObject } from "types";
import { useDispatch, useSelector } from "store";
import { closeSnackbar } from "store/slices/snackbarSlice";

// animation function
function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
};

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const {
    actionButton,
    anchorOrigin,
    alert,
    message,
    open,
    transition,
    variant,
    severity,
    name,
    phoneNumber,
  } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {variant === "default" && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={5000}
          onClose={(e) => handleClose(e)}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ mt: 0.25 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {variant === "alert" && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            severity={severity || "success"}
            variant={alert.variant}
            color={alert.color}
            action={
              <>
                {actionButton !== false && (
                  <Button
                    size="small"
                    onClick={handleClose}
                    sx={{ color: "background.paper" }}
                  >
                    UNDO
                  </Button>
                )}
                <IconButton
                  sx={{ color: `${alert.color}` }}
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
            sx={{
              ...(alert.variant === "outlined" && {
                bgcolor: "background.paper",
              }),
              background: severity === "success" ? "#D5FFED" : "#fff",
              color:
                severity === "success"
                  ? "#000"
                  : severity === "error"
                  ? "#C92027"
                  : "#f8b879",
              marginTop: "50px",
              border: `1px solid ${
                severity === "error"
                  ? "#C92027"
                  : severity === "warning"
                  ? "#f8b879"
                  : "#fff"
              }`,
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
