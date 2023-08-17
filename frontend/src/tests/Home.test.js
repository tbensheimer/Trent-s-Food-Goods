import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

it('Should render Home page properly', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);

    const shoppingLink = screen.getByRole("link");
    const image = screen.getByAltText("A few books and a basket of fruit on the floor");
    const title = screen.getByRole("heading");

    expect(shoppingLink).toBeInTheDocument();
    expect(shoppingLink.textContent).toBe("Start shopping");
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Trent's Food Goods");
  })
