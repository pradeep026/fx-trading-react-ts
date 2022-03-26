import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';
import { store } from '../../stores';

const sleep = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

describe(`Integration Test - App`, () => {
  it('Fx spot works with store', async () => {
    render(<App />);
    const currencyPairHtmlElement = screen.getByTestId(`select--component`);
    expect(screen.getByText(`FX Spot`)).toBeInTheDocument();

    fireEvent.change(currencyPairHtmlElement, { target: { value: `eur,usd`}});
    expect(currencyPairHtmlElement).toHaveValue(`eur,usd`);

    let state = store.getState();
    expect(state.fxRates.ccyKey).toBe(`eurusd`);
    await act(async () => {
      await sleep();
      state = store.getState();
      expect(state.fxRates.fxRates).toBeTruthy();
      expect(screen.getByTestId(`ticker--bid`).innerHTML).toBe(state.fxRates.fxRates[state.fxRates.ccyKey].bid);
      expect(screen.getByTestId(`ticker--ask`).innerHTML).toBe(state.fxRates.fxRates[state.fxRates.ccyKey].ask);
    });
    // Assert BUY as default BuyOrSell Option
    expect((screen.getByLabelText(/BUY/i) as HTMLInputElement).checked).toBeTruthy();
    // Assert EUR currency as selected
    expect((screen.getByLabelText(/EUR/i) as HTMLInputElement).checked).toBeTruthy();

    expect(screen.queryByTestId(`confirmation--message`)).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId(`currency--input`), { target: { value: `Test` }});

    await act(async () => {
      state = await store.getState();
      // Assert Trade button when amount is not a number
      expect(state.fxRates.amount).toBe(`Test`);
      expect(state.fxRates.canTrade).toBeFalsy();
      expect((screen.getByText(/TRADE/i) as HTMLInputElement).disabled).toBeTruthy();
    });

    fireEvent.change(screen.getByTestId(`currency--input`), { target: { value: 1000 }});

    await act(async () => {
      state = await store.getState();
      // Assert Trade button when amount is not a number
      expect(state.fxRates.amount).toBe(`1000`);
      expect(state.fxRates.canTrade).toBeTruthy();
      expect((screen.getByText(/TRADE/i) as HTMLInputElement).disabled).toBeFalsy();
    });

    fireEvent.click((screen.getByText(/TRADE/i)));

    await act(async () => {
      state = await store.getState();
      expect(state.fxRates.confirmationMessage).toBeTruthy();
      expect(screen.getByTestId(`confirmation--message`)).toBeInTheDocument();
    });

    // Reset the currency pair selection which resets the state and dom elements
    fireEvent.change(currencyPairHtmlElement, { target: { value: ``}});
    await act(async () => {
      state = await store.getState();
      expect(state.fxRates.canTrade).toBeFalsy();
      expect(state.fxRates.fxRates).toStrictEqual({});
      expect(screen.getByTestId(`ticker--bid`).innerHTML).toBe(``);
      expect(screen.getByTestId(`ticker--ask`).innerHTML).toBe(``);
      expect(screen.queryByTestId(`confirmation--message`)).not.toBeInTheDocument();
      expect((screen.getByText(/TRADE/i) as HTMLInputElement).disabled).toBeTruthy();
    });
  });
});
