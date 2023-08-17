import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import LoginForm from "../pages/LoginForm";
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: []
    };

const mockStore = configureStore();

it('Should render LoginForm component properly', async () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><LoginForm /></BrowserRouter></Provider>);

    const signupLink = screen.getByRole("link");
    const inputs = screen.getAllByTestId("input");
    const loginBtn = screen.getByRole("button");
    const title = screen.getByRole("heading");

    expect(signupLink).toBeInTheDocument();
    expect(inputs.length).toBe(2);
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.textContent).toBe("Login");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Login")
  })
});
