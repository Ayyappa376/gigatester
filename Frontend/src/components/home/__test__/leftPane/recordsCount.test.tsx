import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { RecordsCount } from '../../leftPane';

describe("platform view", () => {
    const records = [
        { name: 'Testers', value: 220 }
    ]

    it("rendered page", () => {
        const { getByTestId } = render(<RecordsCount records={records} />);
        const elementPlatformView = getByTestId('recordCount-Testers');
        const recordName = getByTestId('recordName');
        const recordCount = getByTestId('recordCount');
        expect(elementPlatformView).toBeInTheDocument();
        expect(elementPlatformView).toBeTruthy();
        expect(recordName).toHaveTextContent('Testers');
        expect(recordCount).toHaveTextContent(220);
    })
})