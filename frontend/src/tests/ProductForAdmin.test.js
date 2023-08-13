import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProductForAdmin from "../components/ProductForAdmin";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";

describe('Redux Environment Setup', () => {
    const productDetails = {
        carbs: 34,
        description: "This is rice",
        image: "www.riceimage.com",
        name: "Rice",
        price: 5,
        price_id: "price3",
        protein: 4,
        salt: 8,
        storage: "This is stored in room temp",
        _id: 1
    }

    let initialState= {
        user: null,
        cart: [{
            carbs: 34,
            description: "This is rice",
            image: "www.riceimage.com",
            name: "Rice",
            price: 5,
            price_id: "price3",
            protein: 4,
            salt: 8,
            storage: "This is stored in room temp",
            _id: 1,
            quantity: 4
        }]
    };

const mockStore = configureStore();

it('Should render ProductForAdmin properly', () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><ProductForAdmin details={productDetails} /></BrowserRouter></Provider>);

    const productName = screen.getByText("Rice");
    const description = screen.getByText("This is rice");
    const removeBtn = screen.getByText("Remove");
    const editBtn = screen.getByText("Edit");

    expect(productName).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
})
});