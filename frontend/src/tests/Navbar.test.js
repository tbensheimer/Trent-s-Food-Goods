import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Navbar from "../components/Navbar";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";

describe('Redux Environment Setup', () => {
    // fetchMock.enableMocks();

    // beforeEach(() => {
    //     fetch.mockClear();
    // })

    let initialState= {
        user: null,
        cart: []
    };

const mockStore = configureStore();

// beforeEach(() => {
//     useSelectorMock.mockClear();
//     useDispatchMock.mockClear();
//   });

//   afterAll(() => {
//     cleanup();
//   });

//   const reactRedux = { useDispatch, useSelector }
//   const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//   const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

it('Should render navbar properly without user', () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

    const signupBtn = screen.getByText("Signup");
    const loginBtn = screen.getByText("Login");
    const links = screen.getAllByRole("link");

    expect(signupBtn).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(links.length).toBe(5);
})

it('Should render navbar properly with user', () => {
    initialState.user = {
        email: "tb@gmail.com",
        admin: false
    };
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

    const dropdown = screen.getByTestId("dropdown");
    const links = screen.getAllByRole("link");

    expect(dropdown.firstChild.textContent).toBe("tb ");
    expect(dropdown.childNodes[1].textContent).toBe("Logout");
    expect(links.length).toBe(5);
})

it('Should render navbar properly with admin user', () => {
    initialState.user = {
        email: "tb@gmail.com",
        admin: true
    };
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);

    const dropdown = screen.getByTestId("dropdown");
    const links = screen.getAllByRole("link");

    expect(dropdown.firstChild.textContent).toBe("tb Admin");
    expect(dropdown.childNodes[1].childNodes[0].textContent).toBe("Manage Products");
    expect(dropdown.childNodes[1].childNodes[1].textContent).toBe("Manage Admins");
    expect(dropdown.childNodes[1].childNodes[2].textContent).toBe("Logout");
    expect(links.length).toBe(7);
})
});