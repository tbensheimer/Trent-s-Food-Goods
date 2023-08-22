import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import Products from "../pages/Products";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
  
beforeAll(() => jest.spyOn(window, 'fetch'))

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: []
    };

const mockStore = configureStore();

it('Should render Products component properly', async () => {
    let store = mockStore(initialState);

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({products: [
            {carbs: 34, description: "This is Rice", 
            fat: 3, image: "rice.jpg", name: "Rice", price: 5, price_id: "price1", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "1"},
            {carbs: 34, description: "This is Carrots", 
            fat: 3, image: "carrots.jpg", name: "Carrots", price: 3, price_id: "price2", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "2"},
            {carbs: 34, description: "This is Lettuce", 
            fat: 3, image: "lettuce.jpg", name: "Lettuce", price: 5, price_id: "price3", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "3"},
            {carbs: 34, description: "This is eggs", 
            fat: 3, image: "eggs.jpg", name: "Eggs", price: 5, price_id: "price4", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "4"},
            {carbs: 34, description: "This is onion", 
            fat: 3, image: "onion.jpg", name: "Onion", price: 5, price_id: "price5", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "5"},
            {carbs: 34, description: "This is wheat", 
            fat: 3, image: "wheat.jpg", name: "Wheat", price: 5, price_id: "price6", protein: 2.2, salt: 12,
            storage: "Store in fridge.",_id: "6"},
        ]}),
      })

    await act(async() => render(<Provider store={store}><BrowserRouter><Products /></BrowserRouter></Provider>));

    const products = screen.getAllByTestId("product");
    const pageLinks = screen.getAllByTestId('page-links');
    const detailBtns =  screen.getAllByText("Details");

    expect(products.length).toBe(4);
    expect(pageLinks.length).toBe(2);
    expect(detailBtns.length).toBe(4);

  })
})
