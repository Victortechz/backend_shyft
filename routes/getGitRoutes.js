const router = require("express").Router();
const axios = require("axios");
const { v4: uuid } = require("uuid");
const { generateUrl } = require("../helperFunctions/generateUrl.js");
const cryptoJS = require("crypto-js");
const baseURL = "https://api.github.com";

router.post("/", async (req, res) => {
  // TAKES IN AN USER OBJECT AND BASEURL TO GENERATE A URL STRING PER OBJECT
  let requestUrlList = generateUrl(req.body, baseURL);

  const DEFAULT_ACCESS_KEY = process.env.DEFAULT_ACCESS_KEY;

  // MAKE CONCURRENT REQUEST FROM REQUEST LIST
  await Promise.allSettled(
    requestUrlList.map((request) =>
      axios.get(request.repoUrl, {
        userName: request.userName,
        repoName: request.repoName,
        headers: {
          Authorization: `Basic  ${
            request.privateKey ? request.privateKey : DEFAULT_ACCESS_KEY
          }`,
        },
      })
    )
  )
    .then(
      axios.spread((...responses) => {
        const results = responses.map((response) => {
          //   returned response object
          let result = {
            _id: uuid(),
            userName: response?.value?.data?.owner.login,
            repoName: response?.value?.data?.name,
            description: response?.value?.data.description,
            stargazersCount: response?.value?.data?.stargazers_count,
            status: response.status,
            errId: response?.reason?.config.userName,
            errRepo: response?.reason?.config.repoName,
          };
          return result;
        });
        //  console.log(results)
        res.status(200).json(results);
      })
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
