import { useState } from "react";
import { Outlet } from "react-router-dom";
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
    JSON.parse(localStorage.getItem("basket") as any) || {}
  );

  const handleOptionChange = (option: "delivery" | "pickup") => {
    setSelectedOption(option);
  };

  const handleCartClick = () => {
    setStoredBasket(JSON.parse(localStorage.getItem("basket") as any));
    setIsDrawerOpen(true);
  };

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        onCartClick={handleCartClick}
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
          <Outlet />
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
                  defaultExpanded
                  disableGutters
                  elevation={0}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                    borderBottom: "1px solid #e0e0e0", // Keep border only for Accordion
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${storeId}-content`}
                    id={`panel-${storeId}-header`}
                    sx={{
                      padding: 0,
                      marginBottom: "8px",
                      "&.Mui-expanded": {
                        minHeight: 0,
                      },
                      borderBottom: "none", // Removed borderBottom from Summary
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                      Store ID : {storeId}
                    </Typography>
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
                              width: 60,
                              height: 60,
                              marginRight: 2,
                              borderRadius: 2,
                            }}
                          />
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "1rem",
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
              color="primary"
              disabled={Object.keys(storedBasket).length === 0}
              fullWidth
              sx={{
                padding: "12px",
                borderRadius: "30px",
                fontWeight: "bold",
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
