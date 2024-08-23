import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  InputBase,
  ButtonGroup,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FC, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: "20px",
  padding: "8px 16px",
  minWidth: "100px",
  textTransform: "none",
  fontWeight: selected ? "bold" : "normal",
  backgroundColor: selected ? "#d82927" : "transparent",
  color: selected ? "#fff" : theme.palette.text.primary,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add subtle shadow
  "&:hover": {
    backgroundColor: selected ? "#b71c1c" : "rgba(0, 0, 0, 0.05)", // Darker background on hover
    borderColor: selected ? "#b71c1c" : "#bbb", // Slightly darker border on hover
  },
}));

interface HeaderProps {
  selectedOption: "delivery" | "pickup";
  handleOptionChange: (option: "delivery" | "pickup") => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  onSearchChange: (query: string) => void; // New prop for handling search input
}

export const Header: FC<HeaderProps> = ({
  selectedOption,
  handleOptionChange,
  onCartClick,
  onAccountClick,
  onSearchChange, // Receiving the search change function
}) => {
  const { storeId } = useParams();
  const [storedBasket, setStoreBasket] = useState("");
  const totalItems = Object.values(storedBasket || {}).reduce(
    (acc, items: any) =>
      acc + items?.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  useEffect(() => {
    setStoreBasket(JSON.parse(localStorage.getItem("basket")));
  }, [JSON.parse(localStorage.getItem("basket"))]);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#ffffff", // White background
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
        color: "black", // Text and icon colors
      }}
    >
      <Toolbar>
        {/* Left-side Logo */}
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              <img
                src="https://foodhub.co.uk/compressed_images/logo.svg"
                alt="Logo"
              />
            </Typography>
          </Grid>

          {/* Center Search Bar */}
          <Grid item xs={4}>
            {!storeId && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <InputBase
                  placeholder="Search..."
                  startAdornment={<SearchIcon sx={{ color: "black" }} />}
                  sx={{
                    bgcolor: "#f1f1f1", // Light grey background for the search bar
                    borderRadius: "20px",
                    padding: "5px 15px",
                    width: "100%",
                    maxWidth: 600,
                    boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </Box>
            )}
          </Grid>

          {/* Right-side Toggle and Cart */}
          <Grid
            item
            xs={5}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* New Button with Location Icon */}
            <HeaderButton onClick={() => console.log("New button clicked")}>
              <LocationOnIcon htmlColor="#d82927" sx={{ mr: 1 }} />
              <b>Stoke-on-Trent</b>
            </HeaderButton>
            <Box mx={1} />
            {!storeId && (
              <ButtonGroup variant="text" aria-label="delivery/pickup toggle">
                <HeaderButton
                  onClick={() => handleOptionChange("delivery")}
                  selected={selectedOption === "delivery"}
                >
                  Delivery
                </HeaderButton>
                <HeaderButton
                  onClick={() => handleOptionChange("pickup")}
                  selected={selectedOption === "pickup"}
                >
                  Pickup
                </HeaderButton>
              </ButtonGroup>
            )}
            <IconButton color="inherit" sx={{ ml: 2 }} onClick={onCartClick}>
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 2 }} onClick={onAccountClick}>
              {/* <Badge badgeContent={totalItems} color="primary"> */}
              <AccountCircleIcon sx={{ color: "black" }} />
              {/* </Badge> */}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
