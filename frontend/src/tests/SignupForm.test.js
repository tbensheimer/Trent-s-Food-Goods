import { render, screen,  act } from "@testing-library/react";
import '@testing-library/jest-dom'
import SignupForm from "../pages/SignupForm";
import configureStore from 'redux-mock-store'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

describe('Redux Environment Setup', () => {
    let initialState= {
        user: null,
        cart: []
    };

const mockStore = configureStore();

it('Should render SignupForm component properly', async () => {
    let store = mockStore(initialState);

    render(<Provider store={store}><BrowserRouter><SignupForm /></BrowserRouter></Provider>);

    const inputs = screen.getAllByTestId("input");
    const signupBtn = screen.getByRole("button");
    const title = screen.getByRole("heading");

    expect(inputs.length).toBe(2);
    expect(signupBtn).toBeInTheDocument();
    expect(signupBtn.textContent).toBe("Signup");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Signup")
  })
});
