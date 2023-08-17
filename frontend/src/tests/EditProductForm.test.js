import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import EditProductForm from "../pages/EditProductForm";
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

it('Should render AdminProductList component properly', async () => {
    jest.mock('react-router-dom', () => ({
        useParams: () => ({
            id: 1
        })
    }))
    let store = mockStore(initialState);

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            _id: 1, name: "Rice", description: "This is Rice", price: 5, image: "rice.jpg",
            price_id: "price1", fat: 3, protein: 2, salt: 9, carbs: 20, storage: "Store in fridge"
        })
      })

    await act(async() => render(<Provider store={store}><BrowserRouter><EditProductForm /></BrowserRouter></Provider>));

   const productDescription =  screen.getByText("This is Rice");
   const inputs = screen.getAllByRole('textbox');
   const productImage = screen.getByAltText("food pic");
   const saveBtn = screen.getByText("Save");
   const backBtn = screen.getByText("Back");

   expect(productDescription).toBeInTheDocument();
   expect(inputs.length).toBe(9);
   expect(productImage).toBeInTheDocument();
   expect(saveBtn).toBeInTheDocument();
   expect(backBtn).toBeInTheDocument();
  })
})
