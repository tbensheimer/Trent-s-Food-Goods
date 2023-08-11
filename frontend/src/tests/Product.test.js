import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Product from "../components/Product";
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

it('Should render product properly', () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Pagination {...paginationAttributes} 
        onPrevClick={onPrevClick} 
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        admin={false}
        data={products}
        totalPages={Math.ceil(products.length / 3)}
        dataPerPage={3}/></BrowserRouter></Provider>);

    const renderedProducts = screen.getAllByRole("heading");
    const links = screen.getAllByTestId("page-links");
    const PrevBtn = screen.getByText("Prev");
    
    expect(renderedProducts.length).toBe(3);
    expect(links.length).toBe(2);
    expect(PrevBtn.disabled).toBe(true);
})
});