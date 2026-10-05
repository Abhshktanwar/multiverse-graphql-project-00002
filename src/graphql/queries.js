import { gql } from "@apollo/client";

// 1. Home Page ke liye saare characters fetch karne ki query
export const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

// 2. Detail Page ke liye ek specific character + uske episodes fetch karne ki query
export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;
