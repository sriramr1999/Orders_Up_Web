import { Box, Typography, IconButton } from "@mui/material";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import CakeIcon from "@mui/icons-material/Cake";
import HamburgerIcon from "@mui/icons-material/LunchDining";
import ChickenIcon from "@mui/icons-material/EmojiFoodBeverage";
import SandwichIcon from "@mui/icons-material/Dining";
import MexicanIcon from "@mui/icons-material/EmojiFoodBeverage";
import PhoIcon from "@mui/icons-material/RamenDining";
import SmoothieIcon from "@mui/icons-material/EmojiFoodBeverage";
import SushiIcon from "@mui/icons-material/RamenDining";
import ChineseIcon from "@mui/icons-material/TakeoutDining";
import SoupIcon from "@mui/icons-material/SoupKitchen";
import SaladIcon from "@mui/icons-material/SoupKitchen";
import { FC } from "react";

const categories = [
  { icon: <BreakfastDiningIcon htmlColor="#FFA500" />, label: "Breakfast" }, // Orange color
  { icon: <LocalCafeIcon htmlColor="#8B4513" />, label: "Coffee" }, // Brown color
  { icon: <FastfoodIcon htmlColor="#FF0000" />, label: "Fast Food" }, // Red color
  { icon: <LocalPizzaIcon htmlColor="#FF4500" />, label: "Pizza" }, // OrangeRed color
  { icon: <EmojiNatureIcon htmlColor="#008000" />, label: "Healthy" }, // Green color
  { icon: <CakeIcon htmlColor="#800080" />, label: "Desserts" }, // Purple color
  { icon: <HamburgerIcon htmlColor="#A52A2A" />, label: "Burgers" }, // Brown color
  { icon: <ChickenIcon htmlColor="#FFD700" />, label: "Chicken" }, // Gold color
  { icon: <SandwichIcon htmlColor="#DAA520" />, label: "Sandwiches" }, // GoldenRod color
  { icon: <MexicanIcon htmlColor="#FF6347" />, label: "Mexican" }, // Tomato color
  { icon: <PhoIcon htmlColor="#32CD32" />, label: "Pho" }, // LimeGreen color
  { icon: <SmoothieIcon htmlColor="#9370DB" />, label: "Smoothie" }, // MediumPurple color
  { icon: <SushiIcon htmlColor="#4682B4" />, label: "Sushi" }, // SteelBlue color
  { icon: <ChineseIcon htmlColor="#FF0000" />, label: "Chinese" }, // Red color
  { icon: <SoupIcon htmlColor="#FF8C00" />, label: "Soup" }, // DarkOrange color
  { icon: <SaladIcon htmlColor="#32CD32" />, label: "Salad" }, // LimeGreen color
];

export const FoodCategories: FC = () => {
  return (
    <Box
      sx={{
        overflowX: "scroll",
        display: "flex",
        whiteSpace: "nowrap",
        padding: "10px",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none", // IE and Edge
        "scrollbar-width": "none", // Firefox
      }}
    >
      {categories.map((category, index) => (
        <Box key={index} sx={{ textAlign: "center", padding: "10px" }}>
          <IconButton>{category.icon}</IconButton>
          <Typography variant="caption">{category.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};
