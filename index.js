import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "vishal257";
const yourPassword = "vishal257";
const yourAPIKey = "832a08d0-a3a3-41c3-a075-6a6140da7550";
const yourBearerToken = "11cefd7c-02f2-410c-9e79-f03a8953651b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try{
    const result = await axios.get(API_URL+"/random");
    res.render("index.ejs",{ content: JSON.stringify(result.data) })
  }catch(error){
    res.status(404).send(error.message);
  }
});


app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try{
    const result = await axios.get(API_URL+"/all?page=2",{
      auth:{
        username: yourUsername,
        password: yourPassword
      }
    })
    res.render("index.ejs",{content:JSON.stringify(result.data)})
  }catch(error){
    res.status(404).send(error.message)
  }
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
