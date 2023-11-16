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
const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curCategory = useSelector(
    (state: { global: GlobalState }) => state.global.category
  );
 

  let { data: products, error } = useGetProductsQuery({}); // products

  if (error) {
    return <>error to get products</>;
  }

  products = products? products.filter((p: any) => p.category == curCategory)
    : [];


  return (
    <div style={{ backgroundColor: "#87CEEB", minHeight: "93vh" }}>
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
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {products &&
                products.map((card: Product, i: number) => (
                  <Grid item key={Date.now() * i} xs={12} sm={6} md={4}>
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
