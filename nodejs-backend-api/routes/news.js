var express = require("express");
var newsRouter = express.Router();
const axios = require("axios");
const config = require("../config");

newsRouter
  .route("/")
  .get((req, res, next) => {
    axios
      .get("https://dev-news-dec.pantheonsite.io/jsonapi/node/article")
      .then((results) => {
        const newsData = results.data.data.map((data) => {
          const item = {
            id: data.id,
            title: data.attributes.title,
            created_on: data.attributes.created,
            content: data.attributes.body.processed,
          };
          return item;
        });

        // filterData.push(item);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(newsData);
      })
      .catch((error) => next(error));
  })
  .post((req, res, next) => {
    const { title, content, auth } = req.body;

    if (typeof auth !== "undefined") {
      if (auth !== null || auth !== "") {
        let postData = {
          type: [{ target_id: "article" }],
          title: [{ value: title }],
          body: [{ value: content }],
        };
        // set the headers
        const config = {
          headers: {
            Authorization: "Basic " + auth,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        };
        axios
          .post(
            "https://dev-news-dec.pantheonsite.io/entity/node?_format=json",
            postData,
            config
          )
          .then((result) => {
            res.json(result.data);
          })
          .catch((e) => res.json(e));
      } else {
        res.status = 401;
        res.json("You are not authorizes " + auth);
      }
    } else {
      res.status = 401;
      res.json("You are not authorizes " + auth);
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.json("put req not allow");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.json("delete req not allow");
  });

newsRouter.route("/:id").get((req, res, next) => {
  const id = req.params.id;
  const apiURL = config.articleURL + "/" + id;
  axios
    .get(apiURL)
    .then((result) => {
      const data = result.data.data;

      const item = {
        id: id,
        title: data.attributes.title,
        created_on: data.attributes.created,
        content: data.attributes.body.processed,
      };

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(item);
    })
    .catch((error) => next(error));
});

module.exports = newsRouter;
