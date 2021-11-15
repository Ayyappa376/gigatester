import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { UsersFeedback } from '../../leftPane';

describe("platform view", () => {

    const usersFeedback = [
        {
            label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
    ];

    it("rendered page", () => {
        const { getByTestId } = render(<UsersFeedback usersFeedback={usersFeedback} />);
        const elementPlatformView = getByTestId('userFeedback')
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
    })

    it("header", () => {
        const { getByTestId } = render(<UsersFeedback usersFeedback={usersFeedback} />);
        const header = getByTestId('header')
        expect(header).toHaveTextContent('BUZZ')
    })

    it("user message", () => {
        const { getByTestId } = render(<UsersFeedback usersFeedback={usersFeedback} />);
        const message = getByTestId('feedbackMessage')
        expect(message).toHaveTextContent(usersFeedback[0].label);
        const userPic = screen.getByRole('img');
        expect(userPic).toHaveAttribute('src', usersFeedback[0].imgPath);
        expect(userPic).toHaveAttribute('alt', usersFeedback[0].label);
    })
    it("button", () => {
        const { getByTestId, getAllByTestId } = render(<UsersFeedback usersFeedback={usersFeedback} />);
        const button = getByTestId('nextButton')
        const buttonLength = getAllByTestId('nextButton')
        expect(button).toBeTruthy();
        expect(buttonLength).toHaveLength(1);
        
    })
    it("button", () => {
        const { getByTestId, getAllByTestId } = render(<UsersFeedback usersFeedback={usersFeedback} />);
        const button = getByTestId('backButton')
        const buttonLength = getAllByTestId('backButton')
        expect(button).toBeTruthy();
        expect(buttonLength).toHaveLength(1);
        
    })
})