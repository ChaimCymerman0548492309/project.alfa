import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import  { GlobalState, setCategory } from "../state";
import {
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useGetCategoriesQuery } from "../state/api";
import Box2 from "@mui/joy/Box";
import Card2 from "@mui/joy/Card";
import CardCover2 from "@mui/joy/CardCover";
import CardContent2 from "@mui/joy/CardContent";
import Typography2 from "@mui/joy/Typography";
import { useDispatch } from "react-redux";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const data = useSelector(
  //   (state: { global: GlobalState }) => state.global.products
  // );
  // console.log(data);

  //state-filter

  const { data: categories, error } = useGetCategoriesQuery() || []; //categories
  if (error) {
    // Handle the error, e.g., display an error message
    return <div>Error loading categories</div>;
  }

  //filter

  return (
    <div style={{ backgroundColor: "#87CEEB" }}>
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
            Categories
          </Typography>
        </Container>
        <Container sx={{ py: 8, width: "80%", margin: "0 auto" }} maxWidth="md">
          <Grid container spacing={4}>
            {categories && // category - price
              categories.map((card: any, i: number) => (
                <Grid item key={Date.now() * i} xs={12} sm={6} md={4}>
                  <div
                    onClick={() => {
                      dispatch(setCategory(card.category))
                      
                      navigate("/products");
                    }}
                  >
                    <Box2
                      sx={{
                        perspective: "1000px",
                        transition: "transform 0.4s",
                        "& > div, & > div > div": {
                          transition: "inherit",
                        },
                        "&:hover": {
                          "& > div": {
                            transform: "rotateY(30deg)",
                            "& > div:nth-child(2)": {
                              transform:
                                "scaleY(0.9) translate3d(20px, 30px, 40px)",
                            },
                            "& > div:nth-child(3)": {
                              transform: "translate3d(45px, 50px, 40px)",
                            },
                          },
                        },
                      }}
                    >
                      <Card2
                        variant="outlined"
                        sx={{
                          minHeight: "280px",
                          width: 320,
                          backgroundColor: "#fff",
                          borderColor: "#000",
                          backgroundImage: `url(${card.img})`, // Set background image
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <CardCover2
                          sx={{
                            border: "1px solid",
                            borderColor: "#777",
                            backdropFilter: "blur(1px)",
                            backgroundImage: `url(${card.img})`, // Set background image
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></CardCover2>
                        <CardContent2
                          sx={{
                            alignItems: "self-end",
                            justifyContent: "flex-end",
                            border: "1px solid",
                            borderColor: "#000",
                            backdropFilter: "blur(1px)",
                            backgroundImage: `url(${card.img})`, // Set background image
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <Typography2
                            level="h2"
                            fontSize="lg"
                            fontWeight="bold" // Set the font weight to bold
                            textColor="white" // Change the text color to a more contrasting color
                            m={2}
                          >
                            {card.category}
                          </Typography2>
                        </CardContent2>
                      </Card2>
                    </Box2>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
