//THIRD-IMPORT
import React from "react";
import { Box, TextField } from "@mui/material";

//PROJECT-IMPORT
interface IPropsInput {
  label?: string;
}
const InputBase = ({ label }: IPropsInput) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth label={label} id="fullWidth" />
    </Box>
  );
};

export default InputBase;
