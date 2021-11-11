import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import TesterEvents from '../../topPane';

describe("tester events", () => {

    it("rendered page", () => {
        const { getByTestId } = render(<TesterEvents />);
        const elementPlatformView = getByTestId('testerEvents')
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
    })

    it("sign-up button", () => {
        const { getByTestId } = render(<TesterEvents />);
        const signUpButton = getByTestId('signUp')
        expect(signUpButton).toBeTruthy();
    })

    it("sign-in button", () => {
        const { getByTestId } = render(<TesterEvents />);
        const signInbutton = getByTestId('signIn')
        expect(signInbutton).toBeTruthy();
    })
})