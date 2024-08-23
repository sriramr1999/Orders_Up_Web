import React from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ImageProps {
  logo: any;
  bgImage: any;
}
export const ImageCard: React.FC<ImageProps> = ({ logo, bgImage }) => {
  return (
    <Card
      sx={{
        maxWidth: "auto",
        borderRadius: 4,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={bgImage}
        alt="Chick-fil-A meal"
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          borderRadius: "50%",
          padding: 0.5,
        }}
      >
        <img
          src={logo}
          alt="Chick-fil-A logo"
          style={{ height: 80, width: 80, borderRadius: "50%" }}
        />
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>
    </Card>
  );
};
