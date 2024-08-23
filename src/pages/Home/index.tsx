import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { FoodCategories } from "../../components/FoodCategories";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const ContentArea = styled(Box)({
  backgroundColor: "#ffffff",
  padding: "20px",
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden", // Disable horizontal scrolling
  height: "100vh", // Full viewport height to allow scrolling
  boxSizing: "border-box", // Ensure padding doesn't affect height
});

const ScrollContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  overflowX: "auto",
  whiteSpace: "nowrap", // Keep elements on the same line
});

export const Home: FC = () => {
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [restaurantData, setRestaurantData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const fetchedData: any[] = [];
        for (let i = 1; i <= 20; i++) {
          const response = await axios.get(`/src/json/restaurant/${i}.json`);
          fetchedData.push(response.data);
        }
        setRestaurantData(fetchedData);
      } catch (error) {
        console.error("Error fetching restaurant data", error);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleArrowClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Scroll by 200px
        behavior: "smooth",
      });
    }
  };

  // Filter the restaurants based on selected category
  const filteredRestaurants = selectedCategory
    ? restaurantData.filter((restaurant) =>
        restaurant.cuisine?.some((cuisine: string) =>
          cuisine.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        )
      )
    : restaurantData;

  // Handle card click to navigate to the menu page
  const handleCardClick = (storeId: string) => {
    navigate(`${storeId}/menu`);
  };

  return (

          <ContentArea>
            <ScrollContainer ref={scrollRef}>
              <FoodCategories
                onSelectCategory={(category: string) => setSelectedCategory(category)}
                selectedCategory={selectedCategory} // Pass the selected category to FoodCategories
              />
            </ScrollContainer>

            <Grid container spacing={3}>
              {filteredRestaurants.map((restaurant, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    onClick={() => handleCardClick(restaurant.id)} // Add onClick handler here
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                        transition: "transform 0.1s ease",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={restaurant.image}
                      alt={restaurant.name}
                      sx={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <CardContent sx={{ padding: "16px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {restaurant.name}
                        </Typography>
                        <FavoriteBorderIcon
                          sx={{ color: "#ff1744", fontSize: "1rem" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <StarIcon sx={{ color: "gold", fontSize: "0.9rem" }} />
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: "4px", color: "text.secondary" }}
                        >
                          {restaurant.rating} ({restaurant.reviews}) •{" "}
                          {restaurant.distance} • {restaurant.time}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                      >
                        {restaurant.deliveryFee}
                      </Typography>
                      {restaurant.promo && (
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: "8px",
                            backgroundColor: "#ff5722",
                            color: "#ffffff",
                            textTransform: "none",
                            fontSize: "0.8rem",
                            padding: "4px 8px",
                            width: "100%",
                            "&:hover": {
                              backgroundColor: "#e64a19",
                            },
                          }}
                          size="small"
                        >
                          {restaurant.promo}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ContentArea>

  );
};
