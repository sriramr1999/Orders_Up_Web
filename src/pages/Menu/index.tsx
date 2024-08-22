import { FC, useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import { ImageCard } from "../../components/ChickFilAHeader";

export const Menu: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<
    { title: string; price: string; image: string }[]
  >([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const recognitionRef = useRef<InstanceType<
    typeof window.webkitSpeechRecognition
  > | null>(null);

  const categories = [
    "Breakfast",
    "Reviews",
    "Most Ordered",
    "Breakfast Meal Deals",
    "Breakfast Combos",
    "Croissants",
    "Biscuits",
    "Classics",
    "Breakfast Burrito",
    "English Muffins",
    "Coffee",
  ];

  const featuredItems = useMemo(
    () => [
      {
        title: "Briyani",
        price: "$8.99+",
        image: "https://via.placeholder.com/150",
        category: "Breakfast",
      },
      {
        title: "Maple Bacon Chicken Croissant Combo",
        price: "$9.11+",
        image: "https://via.placeholder.com/150",
        category: "Breakfast Combos",
      },
      {
        title: "Seasoned Potatoes",
        price: "$2.49+",
        image: "https://via.placeholder.com/150",
        category: "Most Ordered",
      },
    ],
    []
  );

  useEffect(() => {
    // Initialize Speech Recognition
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false; // Ensure that only the final result is used
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    // Set the first category as selected by default
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    // Filter featuredItems based on searchQuery and selectedCategory
    let itemsToFilter = featuredItems;

    if (selectedCategory) {
      itemsToFilter = itemsToFilter.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchQuery.trim() === "") {
      setFilteredItems(itemsToFilter);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = itemsToFilter.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, selectedCategory, featuredItems]);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear the search query when the category changes
  };

  return (
    <>
      <Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={12}>
            <ImageCard />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box sx={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Wendy's
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <StarIcon sx={{ color: "gold", fontSize: "1rem" }} />
                4.5 (1k+ ratings) • American • 1.4 mi
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" sx={{ borderRadius: "20px" }}>
                  Delivery
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "20px", marginLeft: "8px" }}
                >
                  Pickup
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "20px", marginLeft: "8px" }}
                >
                  Group Order
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <TextField
                  variant="outlined"
                  placeholder="Search"
                  value={searchQuery}
                  fullWidth
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
                    borderRadius: "50px", // This creates the oval shape
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px", // Ensures the input field is also rounded
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc", // Customize the border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#888", // Border color on hover
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 0", // Adjusts the padding inside the input
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={3}>
            <Box sx={{ padding: "16px", borderRight: "1px solid #e0e0e0" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                Store Info
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: "16px" }}
              >
                <ArrowDropDownIcon
                  sx={{ fontSize: "1rem", verticalAlign: "middle" }}
                />{" "}
                Breakfast 6:30 am - 10:25 am
              </Typography>
              <List>
                {categories.map((category, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ padding: "16px" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                Featured Items
              </Typography>
              <Grid container spacing={2}>
                {filteredItems.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.price}
                        </Typography>
                        <Button variant="outlined" sx={{ marginTop: "8px" }}>
                          Add to Order
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {filteredItems.length === 0 && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginTop: "16px" }}
                >
                  No items match your search.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
