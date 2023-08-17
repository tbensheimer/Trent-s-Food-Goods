import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import Cart from "../pages/Cart";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
  
beforeAll(() => jest.spyOn(window, 'fetch'))

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: [{
            carbs: 34,
            description: "This is rice",
            image: "www.riceimage.com",
            name: "Rice",
            price: 5,
            price_id: "price2",
            protein: 4,
            salt: 8,
            storage: "This is stored in room temp",
            _id: 1,
            quantity: 4
        },
        {
            carbs: 34,
            description: "This is eggs",
            image: "www.eggsimage.com",
            name: "Eggs",
            price: 8,
            price_id: "price3",
            protein: 4,
            salt: 8,
            storage: "This is stored in room temp",
            _id: 2,
            quantity: 2
        }]
    };

const mockStore = configureStore();

it('Should render Cart component properly', async () => {
    let store = mockStore(initialState);
    render(<Provider store={store}><BrowserRouter><Cart /></BrowserRouter></Provider>);

    const productImages = screen.getAllByRole("img");
    const combinedRicePrice = screen.getByText("$20");
    const combinedEggPrice = screen.getByText("$16");
    const totalPrice = screen.getByText("$36");
    const payBtn = screen.getByRole("button");

    expect(productImages.length).toBe(2);
    expect(combinedRicePrice).toBeInTheDocument();
    expect(combinedEggPrice).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(payBtn).toBeInTheDocument();
    expect(payBtn.textContent).toBe("Pay");

  })
})
