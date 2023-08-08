import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Input from "../components/Input";

it('Should render Input properly with properties', () => {
    render(<Input type="checkbox" required placeholder="Test" />)
    const input = screen.getByPlaceholderText("Test");
    const requiredIcon = screen.getByText("*");

    expect(input).toBeInTheDocument();
    expect(input.className).toBe("input");
    expect(input.type).toBe("checkbox");
    expect(input.required).toBe(true);
    expect(requiredIcon).toBeInTheDocument();
});
