import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import About from "../pages/About";

it('Should render the about page properly', () => {
    render(<About />);

    const aboutUsTxt = screen.getByText("About Us");
    const image = screen.getByAltText("Woman holding a bag of fruit");

    expect(aboutUsTxt).toBeInTheDocument();
    expect(image).toBeInTheDocument();
})
