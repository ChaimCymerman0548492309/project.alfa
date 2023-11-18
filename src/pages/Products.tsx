import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GlobalState, Product, setProductId } from "../state";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  CardActions,
  CardContent,
} from "@mui/material";
import { useGetProductsQuery } from "../state/api";

import { useState } from "react";
import sortBy from "lodash/sortBy";
import { TextField } from "@mui/material";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curCategory = useSelector(
    (state: { global: GlobalState }) => state.global.category
  );

  const [filter, setFilter] = useState("");

  // const tempData = useSelector(
  //   (state: { global: GlobalState }) => state.global.products
  // );

  let { data: products, error } = useGetProductsQuery({}); // products

  if (error) {
    return <>error to get products</>;
  }

  const [tempMinPrice, setTempMinPrice] = useState(Infinity);
  const [tempMaxPrice, setTempMaxPrice] = useState(Infinity);

  // State for actual filtering
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(Infinity);

  
  let filteredProducts = products ? products.filter((p: Product) => {
    const price = p.commonAttributes.price;
    return p.category === curCategory &&
           price >= filterMinPrice &&
           price <= (filterMaxPrice === Infinity ? price : filterMaxPrice);
  }) : [];  const categoryAttributes = filteredProducts.map((p: any) => p.categoryAttributes);
  const categoryAttributeNames = categoryAttributes.length > 0 ? Object.keys(categoryAttributes[0]) : [];


  if (filter === "price") {
    filteredProducts = sortBy(filteredProducts, "commonAttributes.price");
  }
  if (filter === categoryAttributeNames[0]) {

    console.log(categoryAttributeNames[0]);
    filteredProducts = sortBy(filteredProducts,"categoryAttributes."+ categoryAttributeNames[0]);
    console.log("filer");
    console.log(filteredProducts);
  }
  if (filter === categoryAttributeNames[1]) {
    filteredProducts = sortBy(filteredProducts,"categoryAttributes."+ categoryAttributeNames[1]);
    console.log("filter 1");

    console.log(filteredProducts);
  }
  
  const applyPriceFilter = () => {
    setFilterMinPrice(tempMinPrice);
    setFilterMaxPrice(tempMaxPrice);
    setFilter("priceRange"); // or any other logic to trigger re-render
  };

  // תשנה את products ל-filteredProducts כדי להציג את המוצרים הממויינים
  products = filteredProducts;

  products = products? products.filter((p: any) => p.category == curCategory)

    : [];


  return (
    <div style={{ backgroundColor: "#F0F0F0", minHeight: "93vh" }}>
      <div>
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Products
            </Typography>
          </Container>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setFilter("price")} // לשנות לפי הפרמטר שברצונך
              >
                Sort by Price
              </Button>
              <Button
                variant="outlined"
                onClick={() => setFilter(categoryAttributeNames[0])} // לשנות לפי הפרמטר שברצונך
              >
                Sort by {categoryAttributeNames[0]}
              </Button>
              <Button
                variant="outlined"
                onClick={() => setFilter(categoryAttributeNames[1])} // לשנות לפי הפרמטר שברצונך
              >
                Sort by {categoryAttributeNames[1]}
              </Button>
            </div>
          </div>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <TextField
              label="Min Price"
              type="number"
              variant="outlined"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(Number(e.target.value))}
            />
            <TextField
              label="Max Price"
              type="number"
              variant="outlined"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(Number(e.target.value))}
            />
            <Button variant="contained" onClick={applyPriceFilter}>
              Filter by Price Range
            </Button>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {products &&
                products.map((card: Product, i: number) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={card.commonAttributes.imageURL}
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {card.category}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ minHeight: 70 }}
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ minHeight: 70 }}
                        >
                          {card.commonAttributes.price} $
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ minHeight: 60 }}
                        >
                          {card.commonAttributes.description}
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <Button
                          onClick={() => {
                            // if (compare?.length() > 0) {
                            //   compare.push(card.name)
                            //   dispatch(setCompare(compare))
                            //   navigate("/compare")
                            // } else {
                            dispatch(setProductId(String(card.id)));
                            navigate("/product");
                            // }
                          }}
                          size="small"
                        >
                          View Product
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
};

export default Products;



