const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server connected");
});

app.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const results = await searchQuery(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal sever error" });
  }
});

const { Client } = require("elasticsearch");

const client = new Client({
  host: "http://host.docker.internal:9200",
  log: "trace",
});

const searchQuery = async function (query) {
  const { hits } = await client.search({
    index: "indexing",
    body: {
      query: {
        fuzzy: {
          content: {
            value: query,
            fuzziness: "AUTO",
          },
        },
      },
    },
  });
  return hits.hits ?? [];
};
