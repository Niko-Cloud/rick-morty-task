import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { RecoilRoot } from "recoil";
import CharactersList from "../Pages/CharactersList";
import { MemoryRouter } from "react-router-dom";
import { mockCharacterGetData } from "./MockData";

test("renders loading state initially", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <CharactersList />
      </RecoilRoot>
    </MockedProvider>
  );

  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("renders characters list", async () => {
  render(
    <MemoryRouter>
      <MockedProvider mocks={mockCharacterGetData} addTypename={false}>
        <RecoilRoot>
          <CharactersList />
        </RecoilRoot>
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });
});
