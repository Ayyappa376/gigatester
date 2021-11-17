import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Profile from '../profile';

describe("tester events", () => {

    it("rendered page", () => {
        const { getByTestId } = render(<Profile />);
        const elementProfileForm = getByTestId('profileForm')
        expect(elementProfileForm).toBeInTheDocument();
        expect(elementProfileForm).toBeTruthy();
    })
})