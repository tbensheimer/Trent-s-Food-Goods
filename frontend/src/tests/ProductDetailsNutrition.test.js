import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import ProductDetailsNutrition from "../pages/ProductDetailsNutrition";
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

it('Should render ProductDetailsNutrition component properly', async () => {
  
    const product = {
        _id: 1, name: "Rice", description: "This is Rice", price: 5, image: "rice.jpg",
       price_id: "price1", fat: 3, protein: 2, salt: 9, carbs: 20, storage: "Store in fridge"
   };

    let store = mockStore(initialState);

    await act(async() => render(<Provider store={store}>
        <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={product} />}>
          <Route index element={<ProductDetailsNutrition/>} />
        </Route>
      </Routes>
    </MemoryRouter>
        </Provider>));

    const table = screen.getByTestId("table");
    const addProductBtn = screen.getByTestId("addBtn");
    expect(addProductBtn).toBeInTheDocument();
    expect(table).toBeInTheDocument()
    expect(table.rows.length).toBe(5);
    expect(table.rows[4].cells[0].textContent).toBe("Salt");
    expect(table.rows[4].cells[1].textContent).toBe("9g");
  })
})
