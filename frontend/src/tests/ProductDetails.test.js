import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProductDetails from "../pages/ProductDetails";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
  
beforeAll(() => jest.spyOn(window, 'fetch'))

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: [{
            _id: 1, name: "Rice", description: "This is Rice", price: 5, image: "rice.jpg",
            price_id: "price1", fat: 3, protein: 2, salt: 9, carbs: 20, storage: "Store in fridge",
            quantity: 5
        }]
    };

const mockStore = configureStore();

it('Should render ProductDetails component properly', async () => {
    let store = mockStore(initialState);

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            _id: 1, name: "Rice", description: "This is Rice", price: 5, image: "rice.jpg",
            price_id: "price1", fat: 3, protein: 2, salt: 9, carbs: 20, storage: "Store in fridge"
        })
      })

    await act(async() => render(<Provider store={store}><BrowserRouter><ProductDetails/></BrowserRouter></Provider>));

   const backBtn = screen.getByTestId("backBtn");
   const tabs = screen.getAllByTestId("tab");
   const image = screen.getByTestId("image");
   const quantity = screen.getByTestId("quantity");

   expect(backBtn).toBeInTheDocument();
   expect(tabs.length).toBe(3);
   expect(image.src).toBe(window.location.origin + "/rice.jpg");
   expect(quantity.textContent).toBe("5");
  })
})