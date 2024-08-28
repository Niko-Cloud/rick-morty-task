import {
  GET_CHARACTERS,
  GET_CHARACTER_DETAIL,
} from "../Queries/CharacterQueries";

export const mockCharacterGetData = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1, name: "" },
    },
    result: {
      data: {
        characters: {
          info: {
            count: 20,
            pages: 2,
            next: 2,
            prev: null,
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              gender: "Male",
              image: "http://example.com/image1.jpg",
            },
            {
              id: "2",
              name: "Morty Smith",
              status: "Alive",
              species: "Human",
              gender: "Male",
              image: "http://example.com/image2.jpg",
            },
          ],
        },
      },
    },
  },
];

export const mocksCharacterDetail = [
  {
    request: {
      query: GET_CHARACTER_DETAIL,
      variables: { id: "1" },
    },
    result: {
      data: {
        character: {
          id: "1",
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          gender: "Male",
          image: "http://example.com/rick.jpg",
          location: {
            name: "Earth",
          },
        },
      },
    },
  },
];
