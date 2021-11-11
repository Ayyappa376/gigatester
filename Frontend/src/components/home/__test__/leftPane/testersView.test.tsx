import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { TestersView } from '../../leftPane';

describe("tester view", () => {
    const testersList = [
        {
            id: 1,
            label: 'San',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    it("rendered page", () => {
        const { getByTestId } = render(<TestersView platformList={testersList} />);
        const elementPlatformView = getByTestId('testers')
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
    })

    it("header", () => {
        const { getByTestId } = render(<TestersView testersList={testersList} />);
        const header = getByTestId('header')
        expect(header).toHaveTextContent('Testers')
    })

    it("button", () => {
        const { getByTestId, getAllByTestId } = render(<TestersView testersList={testersList} />);
        const button = getByTestId('viewAllButton')
        const buttonLength = getAllByTestId('viewAllButton')
        expect(button).toBeTruthy();
        expect(buttonLength).toHaveLength(1);
        screen.getByRole('button', { name: /View All/i })
    })


})
