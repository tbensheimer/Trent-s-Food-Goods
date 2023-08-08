import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Button from "../components/Button";

it('Should render Button properly with properties', () => {
    render(<Button className="test-btn" disabled>Test Button</Button>)
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.className).toBe("btn btn-default test-btn");
    expect(button.disabled).toBe(true);
});

it('Should render Button with outline property', () => {
    render(<Button outline>Test Button</Button>)
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.className).toBe("btn btn-outline");
});