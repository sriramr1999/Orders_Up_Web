import React from "react";
import { Box } from "@mui/material";

export const OrderStatus: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Optional: Set a background color
      }}
    >
      <img
        src={
          "https://blog.converted.in/hs-fs/hubfs/Order%20Confirmation%20Email.png?width=1390&height=1064&name=Order%20Confirmation%20Email.png"
        }
        alt="Order Confirmation"
        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
      />
    </Box>
  );
};
