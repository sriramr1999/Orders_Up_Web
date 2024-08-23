import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Header } from "../../components/Header"; // Adjust the import path as necessary

export const Layout: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [storedBasket, setStoredBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || {}
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query
  const [restaurantNames, setRestaurantNames] = useState<
    Record<string, string>
  >({}); // State for storing restaurant names
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      const names: Record<string, string> = {};
      for (const storeId of Object.keys(storedBasket)) {
        try {
          const response = await import(
            `../../json/restaurant/${storeId}.json`
          );
          names[storeId] = response.name;
        } catch (error) {
          console.error(
            `Failed to load restaurant data for storeId: ${storeId}`,
            error
          );
          names[storeId] = `Store ID: ${storeId}`; // Fallback to storeId if the fetch fails
        }
      }
      setRestaurantNames(names);
    };

    fetchRestaurantNames();
  }, [storedBasket]);

  const handleOptionChange = (option: "delivery" | "pickup") => {
    setSelectedOption(option);
  };

  const handleCartClick = () => {
    setStoredBasket(JSON.parse(localStorage.getItem("basket")));
    setIsDrawerOpen(true);
  };

  const handleAccountClick = () => {};

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const calculateTotal = () => {
    return (
      Object.values(storedBasket as Record<string, any[]>).reduce(
        (total: number, items: any[]) => {
          return (
            total +
            items?.reduce(
              (
                sum: number,
                item: { item: { price: number }; quantity: number }
              ) => sum + item.item.price * item.quantity,
              0
            )
          );
        },
        0
      ) / 100
    );
  };

  const updateLocalStorage = (newBasket) => {
    localStorage.setItem("basket", JSON.stringify(newBasket));
    setStoredBasket(newBasket);
  };

  const handleAddItem = (storeId, item) => {
    const newBasket = { ...storedBasket };

    const existingItemIndex = newBasket[storeId]?.findIndex(
      (basketItem) => basketItem.item.id === item.id
    );

    if (existingItemIndex !== -1) {
      newBasket[storeId][existingItemIndex].quantity += 1;
    } else {
      if (!newBasket[storeId]) {
        newBasket[storeId] = [];
      }
      newBasket[storeId].push({ item, quantity: 1 });
    }

    updateLocalStorage(newBasket);
  };

  const handleRemoveItem = (storeId, itemIndex) => {
    const newBasket = { ...storedBasket };
    const item = newBasket[storeId][itemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      newBasket[storeId].splice(itemIndex, 1);
      if (newBasket[storeId].length === 0) {
        delete newBasket[storeId];
      }
    }

    updateLocalStorage(newBasket);
  };

  const handleDeleteItem = (storeId, itemIndex) => {
    const newBasket = { ...storedBasket };
    newBasket[storeId].splice(itemIndex, 1);
    if (newBasket[storeId].length === 0) {
      delete newBasket[storeId];
    }
    updateLocalStorage(newBasket);
  };

  const handleViewEntireMenu = (storeId) => {
    handleCloseDrawer(); // Close the drawer
    navigate(`/stores/${storeId}/menu`); // Navigate to the store's menu
  };

  const handleDiscardMenu = (storeId) => {
    const newBasket = { ...storedBasket };
    delete newBasket[storeId]; // Remove all items for the store
    updateLocalStorage(newBasket);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
        onSearchChange={(query) => setSearchQuery(query)} // Pass search query to Header
      />
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Outlet context={{ searchQuery }} />{" "}
          {/* Pass searchQuery to Outlet */}
        </Box>
      </Box>

      {/* Drawer for showing basket items */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <Box
          sx={{
            width: 360,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "16px",
          }}
        >
          {/* Drawer Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            sx={{
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Your Cart
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* List of cart items grouped by storeId, scrollable */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", paddingX: 2 }}>
            {Object.keys(storedBasket).length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography>Your basket is empty.</Typography>
              </Box>
            ) : (
              Object.keys(storedBasket).map((storeId) => (
                <Accordion
                  key={storeId}
                  disableGutters
                  elevation={0}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
                    borderRadius: "20px", // Rounded corners
                    marginBottom: "8px", // Space between accordions
                    marginTop: "20px", // Space between accordions
                    overflow: "hidden", // Prevent shadow clipping
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${storeId}-content`}
                    id={`panel-${storeId}-header`}
                    sx={{
                      padding: 0,
                      marginBottom: "8px",
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: "50px", // Apply rounded corners to summary
                      "&.Mui-expanded": {
                        minHeight: 0,
                        borderBottomLeftRadius: 0, // Remove bottom corners when expanded
                        borderBottomRightRadius: 0,
                      },
                      ".MuiAccordionSummary-expandIconWrapper": {
                        marginRight: "16px", // Add space between the expand icon and the border
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Avatar
                        src={`/path/to/store-images/${storeId}.jpg`} // Adjust the path to your store images
                        alt={`${restaurantNames[storeId]} logo`}
                        sx={{
                          width: 50, // Increased size of the store image
                          height: 50, // Increased size of the store image
                          marginLeft: "10px", // Small gap between image and border
                          marginRight: "10px", // Space between the image and the store name
                          borderRadius: 2,
                        }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textAlign: "left", // Align the name to the left
                          }}
                        >
                          {restaurantNames[storeId] || `Store ID: ${storeId}`}
                        </Typography>
                        <Button
                          variant="text"
                          sx={{
                            textTransform: "none",
                            color: "#d82927",
                            marginTop: "2px", // Reduced space between the name and the button
                            padding: 0, // Remove any padding to bring it closer
                            minHeight: "unset", // Ensure it doesn't have extra height
                          }}
                          onClick={() => handleViewEntireMenu(storeId)}
                        >
                          View Menu
                        </Button>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => handleDiscardMenu(storeId)} // Discard button moved before the expand icon
                      sx={{ color: "error.main" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </AccordionSummary>

                  <AccordionDetails sx={{ padding: 0 }}>
                    {/* Items for the Store */}
                    <List>
                      {storedBasket[storeId].map((item, index) => (
                        <ListItem
                        key={index}
                        sx={{
                          alignItems: "flex-start",
                          paddingY: 2,
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        <Avatar
                          src={item.item.image || "/default-image.png"}
                          alt={item.item.name}
                          variant="rounded"
                          sx={{
                            width: 40, // Smaller size for item image
                            height: 40, // Smaller size for item image
                            marginRight: 2,
                            borderRadius: 2,
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              noWrap // Ensures the name is on one line
                              sx={{
                                overflow: "hidden", // Ensures overflow content is hidden
                                textOverflow: "ellipsis", // Adds ellipsis at the end if content overflows
                              }}
                            >
                              {item.item.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              {item.item.description && (
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {item.item.description}
                                </Typography>
                              )}
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                display="block"
                              >
                                ${item.item.price / 100}
                              </Typography>
                            </>
                          }
                        />
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ ml: 2 }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveItem(storeId, index)}
                            sx={{ color: "primary.main" }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            sx={{
                              paddingX: 1,
                              fontWeight: "bold",
                              minWidth: "24px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleAddItem(storeId, item.item)}
                            sx={{ color: "primary.main" }}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ ml: 1, color: "error.main" }}
                            onClick={() => handleDeleteItem(storeId, index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>

          {/* Checkout Button at the bottom, inside the drawer */}
          <Box
            sx={{
              padding: 2,
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "#fafafa",
              position: "sticky",
              bottom: 0,
            }}
          >
            <Button
              variant="contained"
              disabled={Object.keys(storedBasket).length === 0}
              fullWidth
              sx={{
                padding: "12px",
                borderRadius: "30px",
                fontWeight: "bold",
                color: "#fafafa",
                backgroundColor: "#d82927",
                "&:hover": {
                  backgroundColor: "#d82927",
                },
              }}
            >
              Checkout - ${calculateTotal().toFixed(2)}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
