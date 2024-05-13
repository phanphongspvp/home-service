import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const MASTER_URL =
  "https://api-ap-northeast-1.hygraph.com/v2/clw2475dn091q07w8iwxh9dw8/master";

const client = new ApolloClient({
  uri: MASTER_URL,
  cache: new InMemoryCache(),
});

const getSlider = async () => {
  const result = await client.query({
    query: gql`
      query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
    `,
  });
  return result;
};

const getCategory = async () => {
  const result = await client.query({
    query: gql`
      query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
    `,
  });
  return result;
};

const getBusinessList = async () => {
  const result = await client.query({
    query: gql`
      query getBusinessList {
        businessLists {
          id
          name
          email
          contactPersion
          category {
            name
          }
          address
          about
          images {
            url
          }
        }
      }
    `,
  });
  return result;
};

const getBusinessListByCategory = async (category) => {
  const result = await client.query({
    query:
      gql`
        query getBusinessList {
          businessLists(where: { category: { name: "` +
      category +
      `" } }) {
            id
            name
            email
            contactPersion
            category {
              name
            }
            address
            about
            images {
              url
            }
          }
        }
      `,
  });
  return result;
};

export default {
  getSlider,
  getCategory,
  getBusinessList,
  getBusinessListByCategory,
};
