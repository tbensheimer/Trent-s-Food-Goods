import { fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('Redux Environment Setup', () => {

  let initialState= {
      user: null,
      cart: []
  };

const mockStore = configureStore();

it('Should render Home page properly', () => {
    render(<BrowserRouter><Home /></BrowserRouter>, { route: "/" });

    const shoppingLink = screen.getByRole("link");
    const image = screen.getByAltText("A few books and a basket of fruit on the floor");
    const title = screen.getByRole("heading");

    expect(shoppingLink).toBeInTheDocument();
    expect(shoppingLink.textContent).toBe("Start shopping");
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Trent's Food Goods");
  });

  it("Clicking on Start shopping button directs you to products page", () => {
    initialState = {
      email: "tb@gmail.com",
      admin: false
  };

    let store = mockStore(initialState);
    render(<Provider store={store}><BrowserRouter><Home /></BrowserRouter></Provider>);

    let shopBtn = screen.getByRole("link");
    let url = window.location.href;

    expect(shopBtn.textContent).toBe("Start shopping");
    expect(url).toBe(window.location.origin + "/");
    fireEvent.click(shopBtn);
    url = window.location.href;
    expect(url).toBe(window.location.origin + "/products");
    
  });
});