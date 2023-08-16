import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import AdminList from "../pages/AdminList";
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

it('Should render AdminList properly', async () => {
    let store = mockStore(initialState);

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({users: [
            {id: 1, email: "t@gmail.com",  password: "t", admin: 1},
            {id: 2, email: "q@gmail.com",  password: "t", admin: 1},
            {id: 3, email: "w@gmail.com",  password: "t", admin: 1},
            {id: 4, email: "e@gmail.com",  password: "t", admin: 0},
            {id: 5, email: "r@gmail.com",  password: "t", admin: 0},
            {id: 6, email: "y@gmail.com",  password: "t", admin: 0},
            {id: 7, email: "u@gmail.com",  password: "t", admin: 0}
        ]}),
      })

    await act(async() => render(<Provider store={store}><BrowserRouter><AdminList/></BrowserRouter></Provider>));

    const adminCount = screen.getAllByText("Admin").length;
    const userCount = screen.getAllByTestId("user").length;
    const pageLinks = screen.getAllByTestId("page-links").length;

    expect(adminCount).toBe(3);
    expect(userCount).toBe(5);
    expect(pageLinks).toBe(2);
  })
})
