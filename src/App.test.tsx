import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';
import CurrencyForm from './components/CurrencyForm';
import CurrencyWall from './components/CurrencyWall';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('render app', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Forex Live Wall/i);
    expect(linkElement).toBeInTheDocument();
});

test('submit currency form', () => {
    const handleSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<CurrencyForm onCurrencySubmit={handleSubmit} />);
    const input = getByPlaceholderText('EUR/USD');
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'EUR/USD' } });
    expect(input.value).toBe('EUR/USD');
    fireEvent.submit(getByText('Search'));
    expect(handleSubmit).toHaveBeenCalled();
});

test('load currency wall', async () => {
    const { getByText } = render(<CurrencyWall currencyTicker={'EUR/USD'} />);

    await wait(() => expect(getByText('EUR/USD')).toBeInTheDocument());
});
