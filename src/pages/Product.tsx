import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, setCart, setCompare } from "../state";
import { useGetProductQuery, useGetUserQuery } from "../state/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { productId, cart, compare } = useSelector(
    (state: { global: GlobalState }) => state.global
  );

  const { data: product } = useGetProductQuery(productId);
  const userId = useSelector(
    (state: { global: GlobalState }) => state.global.userId
  );
  const user = useGetUserQuery(userId);


  // const getLocalCart = () => {
  //   const local = localStorage.getItem("cart");
  //   const localData = local ? JSON.parse(local) : [];
  //   return localData;
  // };
  const categoryAtt: any = product?.categoryAttributes
  console.log(categoryAtt);

  const addToCart = () => {
    let temp = [...cart, product];
    console.log(temp);
    dispatch(setCart(temp));
    navigate("/cart");
  };

  const addToCompare = () => {
    let temp = [...compare, product];
    console.log(temp);
    dispatch(setCompare(temp));
    if (compare.length > 0) {
      navigate("/compare");
    } else {
      navigate(-1)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "93vh",
        background: "#F0F0F0",
      }}
    >
      {product?.commonAttributes && (
        <Card
          sx={{
            width: "70%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={product.commonAttributes.imageURL}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.commonAttributes.description}
            </Typography>
            <br/>
            {categoryAtt && Object.entries(categoryAtt).map(([key, value]) => (
              <Typography variant="body2" color="text.secondary" key={key}>
                <strong>{`${key}`}</strong>: {`${value}`}
              </Typography>
            ))}
          </CardContent>

          <CardActions>
            <Button onClick={() => addToCart()} size="small">
              Add to cart
            </Button>

            <Button size="small" onClick={addToCompare}>
              Compare
            </Button>
            <Button size="small" onClick={() => { navigate("/Map") }}>
              Available at these stores:
            </Button>

          </CardActions>
        </Card>
      )}
    </div>
  );
}