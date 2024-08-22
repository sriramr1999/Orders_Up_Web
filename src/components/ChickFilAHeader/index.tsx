import React from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const ImageCard: React.FC = () => {
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
        image="https://cdn4.singleinterface.com/files/enterprise/coverphoto/34404/KFC-BAnner-20-02-24-05-04-08.jpg"
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
          src="https://www.shutterstock.com/shutterstock/photos/2269871217/display_1500/stock-vector-kfc-logo-icon-art-design-vector-isolated-head-face-people-person-illustration-american-store-bernie-2269871217.jpg"
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
