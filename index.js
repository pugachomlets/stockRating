import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//How to make get request with axios
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://financialmodelingprep.com/api/v3/stock/list?apikey=Ey4B0cGGQtv70DqfPNcbIBxUixSoqSlt");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);  // The render part is doing to be what your actual data youre grabbing is called when grabbing info
    res.render("index.ejs", {
      error: error.message,
    });
  }
}); 

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const symbol = req.body.symbol; //this finds the type
    //turned into vairables so they can be put into axios find
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=Ey4B0cGGQtv70DqfPNcbIBxUixSoqSlt`
    );
    const result = response.data; //equals the data taken
    console.log(result);
    res.render("index.ejs", {
      data: result[0],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  
});




app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
