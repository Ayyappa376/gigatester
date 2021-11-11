import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { PlatformsView } from '../../leftPane';

describe("platform view", () => {
    const platformList = [{
        id: 1,
        label: 'San',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    }];

    it("rendered page", () => {
        const { getByTestId } = render(<PlatformsView platformList={platformList} />);
        const elementPlatformView = getByTestId('platform')
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
    })

    it("header", () => {
        const { getByTestId } = render(<PlatformsView platformList={platformList} />);
        const header = getByTestId('header')
        expect(header).toHaveTextContent('Platforms')
    })

    it("button", () => {
        const { getByTestId, getAllByTestId } = render(<PlatformsView platformList={platformList} />);
        const button = getByTestId('viewAllButton')
        const buttonLength = getAllByTestId('viewAllButton')
        expect(button).toBeTruthy();
        expect(buttonLength).toHaveLength(1);
        screen.getByRole('button', { name: /View All/i })
    })

    it("platform sections", () => {
        const { getByTestId } = render(<PlatformsView platformList={platformList} />);
        const platformSection = getByTestId('platform-1')
        expect(platformSection).toHaveTextContent('San')
        const platformLogo = screen.getByRole('img');
        expect(platformLogo).toHaveAttribute('src', platformList[0].imgPath);
        expect(platformLogo).toHaveAttribute('alt', platformList[0].label);
    })
})