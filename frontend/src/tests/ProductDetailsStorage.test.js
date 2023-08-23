import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProductDetailsStorage from "../pages/ProductDetailsStorage";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";

beforeAll(() => jest.spyOn(window, 'fetch'))

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: []
    };

    const mockStore = configureStore();

it('Should render ProductDetailsStorage component properly', async () => {
  
    const product = {
        _id: 1, name: "Rice", description: "This is Rice", price: 5, image: "rice.jpg",
       price_id: "price1", fat: 3, protein: 2, salt: 9, carbs: 20, storage: "Store in fridge"
   };

    let store = mockStore(initialState);

    await act(async() => render(<Provider store={store}>
        <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={product} />}>
          <Route index element={<ProductDetailsStorage/>} />
        </Route>
      </Routes>
    </MemoryRouter>
        </Provider>));

    const storage = screen.getByTestId("storage");
    const addProductBtn = screen.getByTestId("addBtn");
    expect(addProductBtn).toBeInTheDocument();
    expect(storage).toBeInTheDocument()
    expect(storage.textContent).toBe("Storage instructions: Store in fridge")
  })
})