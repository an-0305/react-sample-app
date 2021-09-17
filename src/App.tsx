import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";

function App() {
  const [restData, setRestData] = useState([]);
  const [graphqlData, setGraphqlData] = useState<any>({});

  const uri = "https://api.github.com/users/an-0305/repos";

  const query = `query {
    user(login: "an-0305") {
      repositories(last: 20) {
        nodes {
          name
        }
      }
    }
  }`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  });

  useEffect(() => {
    if (!uri) return;
    fetch(uri, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setRestData(result);
      })
      .catch(console.error);
  }, [uri]);

  useEffect(() => {
    client
      .request(query)
      .then((res) => {
        setGraphqlData(res.user.repositories.nodes);
      })
      .catch(console.error);
  }, [query]);

  return (
    <>
      <h1>repositories</h1>
      <div>
        <p>use REST API</p>
        <ul>
          {restData.map((item: any, i: number) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>use GraphQL</p>
        <ul>
          {Object.keys(graphqlData).length &&
            graphqlData.map((item: any, i: number) => (
              <li key={i}>{item.name}</li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;