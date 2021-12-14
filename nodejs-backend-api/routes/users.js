var express = require("express");
var router = express.Router();
var axios = require("axios");
var auth = require("../auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/token", function (req, res, next) {
  // set the headers
  const config = {
    headers: {
      "Content-Type": "application/text",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  axios
    .get("https://dev-news-dec.pantheonsite.io/session/token", config)
    .then((result) => {
      const token = JSON.stringify(result.data);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send(token);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", function (req, res, next) {
  let { name, pass } = req.body;
  axios
    .get("http://localhost:1636/users/token")
    .then((data) => {
      const logdata = {
        name: name,
        pass: pass,
      };

      const base64token = Buffer.from(`${name}:${pass}`).toString("base64");

      const config = {
        headers: {
          "Content-Type": "application/text",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "X-Csrf-Token": data.data,
        },
      };

      axios
        .post(
          "https://dev-news-dec.pantheonsite.io/user/login?_format=json",
          logdata,
          config
        )
        .then((result) => {
          if (result.status == 200) {
            const userData = {
              name: result.data.current_user.name,
              csrf: result.data.csrf_token,
              auth: base64token,
            };
            res.json(userData);
          } else {
            res.status = 400;
            res.json("Incorrect Credential");
          }
        })
        .catch((error) => {
          const errordata = {
            status: error.response.status,
            message: error.response.data.message,
          };
          res.json(errordata);
        });
    })
    .catch((e) => next(e));
});

router.post("/register", function (req, res, next) {
  console.log(req);
  axios
    .get("http://localhost:1636/users/token")
    .then((data) => {
      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/text",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "X-Csrf-Token": data.data,
        },
      };

      let userData = {
        name: { value: req.body.username },
        mail: { value: req.body.email },
        pass: { value: req.body.pass },
      };

      axios
        .post(
          "https://dev-news-dec.pantheonsite.io/user/register?_format=json",
          userData,
          config
        )
        .then((result) => {
          if (result.status == 200) {
            res.json(result.data);
          } else {
            res.json("Incorrect Credential");
          }
        });
    })
    .catch((e) => next(e));
});

module.exports = router;
