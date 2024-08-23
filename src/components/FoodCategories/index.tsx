import { Box, Typography, IconButton } from "@mui/material";
import { FC } from "react";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CakeIcon from "@mui/icons-material/Cake";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import SaladIcon from "@mui/icons-material/EmojiFoodBeverage";
import WineBarIcon from "@mui/icons-material/WineBar";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";

interface FoodCategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  { icon: <LocalPizzaIcon fontSize="large" htmlColor="#d82927"/>, label: "Pizza" },
  { icon: <CakeIcon fontSize="large" htmlColor="#d82927"/>, label: "Desserts" },
  { icon: <RamenDiningIcon fontSize="large" htmlColor="#d82927"/>, label: "Sushi" },
  { icon: <LunchDiningIcon fontSize="large" htmlColor="#d82927"/>, label: "Burgers" },
  { icon: <FastfoodIcon fontSize="large" htmlColor="#d82927"/>, label: "Fast Food" },
  { icon: <SetMealIcon fontSize="large" htmlColor="#d82927"/>, label: "Mexican" },
  { icon: <RestaurantIcon fontSize="large" htmlColor="#d82927"/>, label: "Chinese" },
  { icon: <EmojiFoodBeverageIcon fontSize="large" htmlColor="#d82927"/>, label: "Chicken" },
  { icon: <SoupKitchenIcon fontSize="large" htmlColor="#d82927"/>, label: "Healthy" },
  { icon: <FoodBankIcon fontSize="large" htmlColor="#d82927"/>, label: "Italian" },
  { icon: <FastfoodIcon fontSize="large" htmlColor="#d82927"/>, label: "Sandwiches" },
  { icon: <BreakfastDiningIcon fontSize="large" htmlColor="#d82927"/>, label: "Breakfast" },
  { icon: <LocalCafeIcon fontSize="large" htmlColor="#d82927"/>, label: "Coffee" },
  { icon: <IcecreamIcon fontSize="large" htmlColor="#d82927"/>, label: "Ice Cream" },
  { icon: <LocalBarIcon fontSize="large" htmlColor="#d82927"/>, label: "Bar" },
  { icon: <EmojiNatureIcon fontSize="large" htmlColor="#d82927"/>, label: "Vegan" },
  { icon: <SaladIcon fontSize="large" htmlColor="#d82927"/>, label: "Salads" },
  { icon: <WineBarIcon fontSize="large" htmlColor="#d82927"/>, label: "Wine" },
  { icon: <TakeoutDiningIcon fontSize="large" htmlColor="#d82927"/>, label: "Takeout" },
];

export const FoodCategories: FC<FoodCategoriesProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <Box
      sx={{
        overflowX: "auto",
        display: "flex",
        whiteSpace: "nowrap",
        padding: "10px 0",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none", // IE and Edge
        "scrollbar-width": "none", // Firefox
      }}
    >
      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => onSelectCategory(category.label)} // Handle click and send category label to parent
        >
          <IconButton
            sx={{
              fontSize: "2rem", // Larger icon size
              display: "block",
              margin: "0 auto",
              transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
              transform: selectedCategory === category.label ? "rotate(-10deg)" : "none", // Tilt the icon if selected
              backgroundColor: selectedCategory === category.label ? "#f0f0f0" : "transparent", // Add grey background if selected
              "&:hover": {
                backgroundColor: "#f0f0f0", // Grey background on hover
              },
              borderRadius: "50%", // To make the grey background circular
            }}
          >
            {category.icon}
          </IconButton>
          <Typography 
            variant="caption"
            sx={{
              color: selectedCategory === category.label ? "#d82927" : "#000000", // Change text color when selected
            }}
          >
            {category.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
