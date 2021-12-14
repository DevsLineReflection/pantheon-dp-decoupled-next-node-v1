import NextCors from "nextjs-cors";
import axios from "axios";

export default function handler(req, res) {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
    .then(() => {
      axios
        .post("http://localhost:1636/news/", req.body)
        .then((result) => {
          res.json(result.data);
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => console.log(error));
}
