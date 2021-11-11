import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { LatestNews } from '../../rightPane';

describe("latest news", () => {

    const latestNews = [
        {
            label: 'Latest News : Live Blog about Testing',
            imgPath:
                'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1112&q=80',
        },
    ];

    it("rendered page", () => {
        const { getByTestId } = render(<LatestNews latestNews={latestNews} />);
        const elementPlatformView = getByTestId('latestNews')
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
    })

    it("header", () => {
        const { getByTestId } = render(<LatestNews latestNews={latestNews} />);
        const header = getByTestId('header')
        expect(header).toHaveTextContent('LATEST NEWS')
    })

    it("news title", () => {
        const { getByTestId } = render(<LatestNews latestNews={latestNews} />);
        const message = getByTestId('newsTitle')
        expect(message).toHaveTextContent(latestNews[0].label);
    })

})