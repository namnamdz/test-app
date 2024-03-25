//THIRD-IMPORT
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "store";

//PROJECT-IMPORT

export default function LoadingSpinner() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
