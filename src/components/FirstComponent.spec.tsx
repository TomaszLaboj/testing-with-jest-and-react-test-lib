import {
    fireEvent,
    render,
    screen,
    // act,
    waitFor
} from '@testing-library/react';
import axios from 'axios';
import FirstComponent from "./FirstComponent";
import { jest } from "@jest/globals";
import React from 'react';

const renderFirstComponent = () => {
    return render(
        <FirstComponent />
    )
}
jest.mock('axios');
describe("renders component", () => {
    test("renders component", async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: {
                    error: 'Postcode not found',
                },
            },
        }
        const get = jest.spyOn(axios, 'get').mockRejectedValue(errorResponse);


        renderFirstComponent();
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText('We are really sorry but this postcode hasn\'t been found in the data base'))
        })
        get.mockRestore();
    })
})

