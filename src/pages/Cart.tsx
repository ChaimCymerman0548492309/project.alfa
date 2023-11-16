import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GlobalState, Product, setCart } from "../state";
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

const Cart = () => {
  const { cart } = useSelector(
    (state: { global: GlobalState }) => state.global
  );
  console.log(cart );

type dataToServerAddUser = {
  user_id: any;
  username: any;
  password: any;
  name: any;
  email: any;
  address: any;
  cart: never[];
}

const Cart = () => {
  const navigate = useNavigate();
  const localStorageData = localStorage.getItem('userData')
  // const : {
  //   user_id,
  //   username,
  //   password,
  //   name,
  //   email,
  //   address,
    
  // } = localStorageData;
  const { cart } = useSelector(
    (state: { global: GlobalState }) => state.global
  );
  console.log(cart +' line 21');
  const dispatch = useDispatch()

  return (
    <div>
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
                Cart
              </Typography>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                {cart &&
                  cart.map((card: Product, i: number) => (
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
                          <Button variant="outlined" color="error" onClick={()=> {
                            const temp = cart.filter((p: any)=> p._id != card._id)
                            dispatch(setCart(temp))
                          }}>
                            Delete
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
    </div>
  );
};

export default Cart;
