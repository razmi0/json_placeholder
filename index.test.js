console.log("\n/** Json Server Test | index.test.js **/\n");

const fetchData = async () => {
  try {
    const urls = [
      "http://localhost:4444/pokemons",
      "http://localhost:4444/counts",
      "http://localhost:4444/users",
      "http://localhost:4444/jobs",
    ];
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from ${url}: ${response.status} - ${response.statusText}`
          );
        }
        try {
          const data = await response.json();
          return { url, data };
        } catch (error) {
          throw new Error(`Error parsing JSON response from ${url}: ${error}`);
        }
      })
    );
    responses.map((resp) => {
      if (!resp.data || !resp.data.length)
        throw new Error(`No data fetched from ${resp.url}`);
    });
    console.log("All tests passed! on : ");
    console.table(urls);
    console.log("\n/** Data ready to be used !! **/\n");
  } catch (error) {
    console.log(error + "\n");
  }
};

fetchData();
