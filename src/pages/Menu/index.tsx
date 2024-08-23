import { useState, useMemo, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import GroupsIcon from '@mui/icons-material/Groups';
import BikeScooterIcon from "@mui/icons-material/BikeScooter";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useParams } from "react-router-dom";
import { ImageCard } from "../../components/ChickFilAHeader";
import { AppLoader } from "../../components/AppLoader";

export const Menu = () => {
  const { storeId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [basket, setBasket] = useState([]);
  const [orderType, setOrderType] = useState("delivery");
  const [menuData, setMenuData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const recognitionRef = useRef(null);
  const categoryRefs = useRef({});
  const categoryListRefs = useRef({});
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await import(`../../json/menu/${storeId}.json`);
        setMenuData(data.default);
        setActiveCategory(data.default.categories[0]?.id);
      } catch (err) {
        console.error("Failed to load JSON:", err);
        setMenuData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    const storedBasket =
      JSON.parse(localStorage.getItem("basket") as any) || {};
    setBasket(storedBasket[storeId as any] || []);
  }, [storeId]);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keeps listening until stopped
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      setSearchQuery(transcript);
      setIsListening(false);

      // Stop the recognition after receiving the first result
      recognition.stop();
    };

    (recognitionRef.current as any) = recognition;
  }, []);

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const categories = useMemo(() => {
    return menuData?.categories?.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }, [menuData]);

  const filteredItemsByCategory = useMemo(() => {
    if (!searchQuery) {
      return menuData?.categories?.map((category) => ({
        ...category,
        items: menuData.subcategories
          .filter((sub) => sub.id === category.id)
          .flatMap((sub) =>
            sub.items.map((itemId) =>
              menuData.items.find((item) => item.id === itemId)
            )
          ),
      }));
    }

    const matchedItems = menuData?.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchedItems.reduce((acc, item) => {
      const subcategory = menuData?.subcategories.find((sub) =>
        sub.items.includes(item.id)
      );
      if (subcategory) {
        let category = acc.find((cat) => cat.id === subcategory.id);
        if (!category) {
          category = {
            ...menuData.categories.find((cat) => cat.id === subcategory.id),
            items: [],
          };
          acc.push(category);
        }
        category.items.push(item);
      }
      return acc;
    }, []);
  }, [searchQuery, menuData]);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsListening(!isListening);
    }
  };

  const modifiers = useMemo(() => {
    if (!selectedItem) return [];
    return selectedItem?.modifier_groups?.map((modifierGroupId) =>
      menuData.modifier_groups.find((group) => group.id === modifierGroupId)
    );
  }, [selectedItem, menuData]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => (increment ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleAddToBasket = (selectedItem, selectedModifiers) => {
    const basketItem = {
      item: {
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
      },
      quantity,
      modifiers: Object.keys(selectedModifiers).map((groupId) => {
        const modifierId = selectedModifiers[groupId];

        // Find the modifier group and modifier details
        console.log(menuData.modifier_groups, "menuData.modifier_groups");
        console.log(groupId, "groupId");
        const modifierGroup = menuData.modifier_groups.find(
          (group) => group.id === groupId
        );
        console.log(modifierGroup, "modifier");
        const modifier = menuData.modifiers.find(
          (mod) => mod.id === modifierId
        );

        console.log(modifier, "modifier");
        return {
          groupId,
          groupName: modifierGroup.name,
          modifierId,
          modifierName: modifier.name,
          modifierPrice: modifier.price, // Assuming price is stored in cents
        };
      }),
      orderType, // Add the selected order type to the basket item
    };

    const storedBasket =
      JSON.parse(localStorage.getItem("basket") as any) || {};
    const updatedBasket = {
      ...storedBasket,
      [storeId as any]: [...(storedBasket[storeId as any] || []), basketItem],
    };

    setBasket(updatedBasket[storeId as any]);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    setOpen(false);
  };

  const handleCategoryClick = (categoryId) => {
    const categoryElement = categoryRefs.current[categoryId];
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
      setActiveCategory(categoryId);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the category is visible
    };

    (observerRef.current as any) = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-id");
          setActiveCategory(id);
          // Scroll the left side category list to the active item
          if (categoryListRefs.current[id]) {
            categoryListRefs.current[id].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      });
    }, options);

    const currentObserver = observerRef.current as any;

    Object.keys(categoryRefs.current).forEach((key) => {
      if (categoryRefs.current[key]) {
        currentObserver.observe(categoryRefs.current[key]);
      }
    });

    return () => {
      Object.keys(categoryRefs.current).forEach((key) => {
        if (categoryRefs.current[key]) {
          currentObserver.unobserve(categoryRefs.current[key]);
        }
      });
    };
  }, [filteredItemsByCategory]);

  if (isLoading) {
    return <AppLoader />;
  }

  if (!menuData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">No menu found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <ImageCard />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box sx={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {menuData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <StarIcon sx={{ color: "gold", fontSize: "1rem" }} />
                4.5 (1k+ ratings) • American • 1.4 mi
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant={orderType === "delivery" ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#d82927",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d82927" ,
                    },
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => handleOrderTypeChange("delivery")}
                >
                   <BikeScooterIcon sx={{ marginRight: "8px" }} />
 Delivery
                </Button>
                <Button
                  variant={orderType === "pickup" ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#d82927",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d82927" ,
                    },
                    marginLeft: "8px",
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => handleOrderTypeChange("pickup")}
                >
                  <ShoppingBagIcon sx={{ marginRight: "8px" }} />
  Pickup
                </Button>
                <Button
                  variant={orderType === "group" ? "contained" : "outlined"}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#d82927",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#d82927" ,
                    },
                    marginLeft: "8px",
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => handleOrderTypeChange("group")}
                >
                  <GroupsIcon sx={{ marginRight: "8px" }} />
  Group Order
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <TextField
                  variant="outlined"
                  placeholder="Search for items..."
                  value={searchQuery}
                  fullWidth
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <MicIcon
                          style={{
                            color: isListening ? "red" : "inherit",
                            cursor: "pointer",
                          }}
                          onClick={handleMicClick}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: "30px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ddd",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bbb",
                    },
                    "& .MuiInputBase-input": {
                      padding: "12px 20px",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "20%",
            padding: "16px",
            borderRight: "1px solid #e0e0e0",
            position: "sticky",
            top: "16px",
            height: "calc(100vh - 32px)",
            overflowY: "auto",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              Categories
            </Typography>
            <List>
              {categories?.map((category: any) => (
                <ListItem
                  button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    backgroundColor:
                      activeCategory === category.id ? "#d82927" : "inherit",
                    color: activeCategory === category.id ? "#fff" : "#333",
                    "&:hover": {
                      backgroundColor:
                        activeCategory === category.id ? "#d82927" : "#f0f0f0",
                    },
                    borderRadius: "8px",
                    marginBottom: "8px",
                    transition: "background-color 0.2s ease",
                  }}
                  ref={(el) => (categoryListRefs.current[category.id] = el)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <List>
              <ListItem button>
                <ListItemText primary="Top Rated" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Popular" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="New Arrivals" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Discounts" />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box sx={{ width: "80%", padding: "16px" }}>
          {filteredItemsByCategory?.map((category) => (
            <Box
              key={category.id}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              data-id={category.id}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "16px",
                  marginTop: "16px",
                }}
              >
                {category.name}
              </Typography>
              <Grid container spacing={2}>
                {category.items.map(
                  (item, index) =>
                    item && (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                          onClick={() => handleItemClick(item)}
                          sx={{
                            borderRadius: "10px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                              transform: "scale(1.05)",
                              transition: "transform 0.2s ease-in-out",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="160"
                            image={
                              item.image ||
                              "https://via.placeholder.com/400x300?text=No+Image+Available"
                            }
                            alt={item.name}
                            sx={{ borderRadius: "10px 10px 0 0" }}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: "#333" }}
                            >
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price / 100}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                )}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        selectedItem={selectedItem}
        modifiers={modifiers}
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        handleAddToBasket={handleAddToBasket}
        menuData={menuData}
      />
    </>
  );
};

const ItemDialog = ({
  open,
  handleClose,
  selectedItem,
  modifiers,
  quantity,
  handleQuantityChange,
  handleAddToBasket,
  menuData,
}) => {
  const [selectedModifiers, setSelectedModifiers] = useState({});
  const [canAddToBasket, setCanAddToBasket] = useState(false);

  // Handle modifier selection
  const handleModifierChange = (groupId, modifierId) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [groupId]: modifierId,
    }));
  };

  // Validate if all required modifiers are selected
  useEffect(() => {
    const requiredModifiersMet = modifiers.every((modifierGroup) => {
      if (modifierGroup.min_permitted === 1) {
        return selectedModifiers[modifierGroup.id];
      }
      return true;
    });
    setCanAddToBasket(requiredModifiersMet);
  }, [selectedModifiers, modifiers]);

  // Check if there are modifiers to display
  const hasModifiers = modifiers && modifiers.length > 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {selectedItem?.name}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ${(selectedItem?.price / 100).toFixed(2)}
        </Typography>
      </DialogTitle>

      {hasModifiers && (
        <DialogContent sx={{ padding: "16px" }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "16px", color: "#555" }}
          >
            {selectedItem?.description}
          </Typography>

          {modifiers.map(
            (modifierGroup, index) =>
              modifierGroup && (
                <Box key={index} sx={{ marginBottom: "16px" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", marginBottom: "8px" }}
                  >
                    {modifierGroup.name}{" "}
                    {modifierGroup.min_permitted === 1 && (
                      <span style={{ color: "#f00" }}>Required</span>
                    )}
                  </Typography>
                  {modifierGroup.min_permitted === 1 ? (
                    <RadioGroup
                      onChange={(e) =>
                        handleModifierChange(modifierGroup.id, e.target.value)
                      }
                    >
                      {modifierGroup.modifiers.map((modifierId) => {
                        const modifier = menuData?.modifiers.find(
                          (mod) => mod.id === modifierId
                        );
                        return (
                          <FormControlLabel
                            key={modifierId}
                            value={modifierId}
                            control={<Radio sx={{ color: "#f06" }} />}
                            label={modifier?.name}
                            sx={{ marginBottom: "4px", color: "#555" }}
                          />
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <Box>
                      {modifierGroup.modifiers.map((modifierId) => {
                        const modifier = menuData?.modifiers.find(
                          (mod) => mod.id === modifierId
                        );
                        return (
                          <FormControlLabel
                            key={modifierId}
                            control={
                              <Checkbox
                                sx={{ color: "#f06" }}
                                onChange={() =>
                                  handleModifierChange(
                                    modifierGroup.id,
                                    modifierId
                                  )
                                }
                              />
                            }
                            label={modifier?.name}
                            sx={{ marginBottom: "4px", color: "#555" }}
                          />
                        );
                      })}
                    </Box>
                  )}
                </Box>
              )
          )}
        </DialogContent>
      )}

      <DialogActions
        sx={{
          padding: "16px",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box display="flex" alignItems="center" sx={{ marginRight: "auto" }}>
          <IconButton
            onClick={() => handleQuantityChange(false)}
            sx={{ color: "#333" }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            variant="body1"
            sx={{
              margin: "0 16px",
              fontSize: "18px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {quantity}
          </Typography>
          <IconButton
            onClick={() => handleQuantityChange(true)}
            sx={{ color: "#333" }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          onClick={() => handleAddToBasket(selectedItem, selectedModifiers)}
          variant="contained"
          sx={{
            backgroundColor: canAddToBasket ? "#ff4c4c" : "#ccc",
            color: "#fff",
            borderRadius: "30px",
            padding: "10px 20px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: canAddToBasket ? "#ff3333" : "#bbb",
            },
          }}
          disabled={!canAddToBasket} // Disable the button if not all required modifiers are selected
        >
          Add to Basket - ${((selectedItem?.price * quantity) / 100).toFixed(2)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
