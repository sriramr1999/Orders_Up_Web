import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DELIVERY_FEE = 349; // in cents, adjust this value as needed
const TAX_RATE = 0.1; // 10% tax rate, adjust this value as needed

const formatPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

const calculateSubtotal = (orders: any[]) => {
  return orders.reduce((total, order) => {
    const itemTotal = order.item.price * order.quantity;
    const modifiersTotal = order.modifiers.reduce(
      (sum: number, modifier: any) => sum + modifier.modifierPrice,
      0
    );
    return total + itemTotal + modifiersTotal;
  }, 0);
};

export const CheckoutPage = () => {
  const [orderData, setOrderData] = useState(
    JSON.parse(localStorage.getItem("basket") as any) || {}
  );
  const [expanded, setExpanded] = useState<string | false>("panel0");

  useEffect(() => {
    setOrderData(JSON.parse(localStorage.getItem("basket") as any));
  }, []);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const overallTotal = Object.entries(orderData).reduce(
    (total, [key, orders]) => {
      const subtotal = calculateSubtotal(orders as any);
      const feesAndTax = subtotal * TAX_RATE;
      const storeTotal = subtotal + DELIVERY_FEE + feesAndTax;
      return total + storeTotal;
    },
    0
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side - Account & Shipping Details */}
        <Grid item xs={12} md={7}>
          {/* Account Details */}
          <Box mb={4}>
            <Typography variant="h6">1. Account details</Typography>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue="sriramr1488@gmail.com"
              InputProps={{
                readOnly: true,
              }}
              sx={{ mt: 2 }}
            />
          </Box>

          {/* Shipping Details */}
          <Box mb={4}>
            <Typography variant="h6">2. Shipping details</Typography>
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>
                    3966 Rosebay Ct, Fairfax, VA 22033, USA
                  </Typography>
                </Box>
                {/* Dummy Google Map Image */}
                <Box mt={2}>
                  <img
                    src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
                    alt="Map location"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Leave it at my door
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Oval Button for Overall Total */}
        </Grid>

        {/* Right Side - Store Name & Item Details as Accordions */}
        <Grid item xs={12} md={5}>
          {Object?.entries(orderData)?.map(([key, orders], index) => {
            const subtotal = calculateSubtotal(orders as any);
            const feesAndTax = subtotal * TAX_RATE;
            const total = subtotal + DELIVERY_FEE + feesAndTax;

            return (
              <Accordion
                key={key}
                expanded={expanded === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    Orders from {orders[0].name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {orders?.map((order: any, idx: any) => (
                    <Box key={idx} mb={3}>
                      <Typography variant="subtitle1">
                        {order.item.name} (x{order.quantity})
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formatPrice(order.item.price)}
                      </Typography>
                      {order.modifiers.length > 0 && (
                        <Box ml={2} mt={1}>
                          {order.modifiers.map((modifier, modIndex) => (
                            <Typography
                              key={modIndex}
                              variant="body2"
                              color="textSecondary"
                            >
                              {modifier.modifierName} (+
                              {formatPrice(modifier.modifierPrice)})
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <List>
                    <ListItem>
                      <ListItemText primary="Subtotal" />
                      <Typography>{formatPrice(subtotal)}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Delivery Fee" />
                      <Typography>{formatPrice(DELIVERY_FEE)}</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Fees & Estimated Tax" />
                      <Typography>{formatPrice(feesAndTax)}</Typography>
                    </ListItem>
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Total: {formatPrice(total)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "50px",
                padding: "10px 30px",
                fontSize: "16px",
              }}
            >
              Place Your Order - {formatPrice(overallTotal)}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
