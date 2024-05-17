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
          businessLists(where: { category: { name: "${category}" } }) {
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

const getUserBooking = async (userEmail) => {
  const result = await client.query({
    query:
      gql`
      query getUserBookings {
        bookings(
          orderBy: publishedAt_DESC
          where: {userEmail: "${userEmail}"}
        ) {
          id
          userName
          userEmail
          time
          date
          note
          bookingStatus
          businessList {
            id
            images {
              url
            }
            name
            address
            contactPersion
            email
            about
          }
        }
      }
      `,
  });
  console.log(result);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery = await client.mutate({
    mutation: gql`
      mutation createBooking {
        createBooking(
          data: {
            bookingStatus: Booked,
            businessList: { connect: { id: "${data?.businessId}" } },
            date: "${data?.date}",
            time: "${data?.time}",
            note: "${data?.note}",
            userEmail: "${data?.userEmail}",
            userName: "${data?.userName}"
          }
        ) {
          id
        }
        publishManyBookings(to: PUBLISHED) {
          count
        }
      }
    `
  });
  return mutationQuery;
}

export default {
  getSlider,
  getCategory,
  getBusinessList,
  getBusinessListByCategory,
  getUserBooking,
  createBooking
};
