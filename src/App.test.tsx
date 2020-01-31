import React from 'react';
import { render, fireEvent, getByPlaceholderText } from '@testing-library/react';
import App from './App';
import CurrencyForm from './components/CurrencyForm';
import CurrencyWall from './components/CurrencyWall';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

test('renders learn react link', () => {
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

test('live wall', async () => {
    const wrapper = await Enzyme.shallow(<CurrencyWall currencyTicker={'EUR/USD'} />);
    jest.useFakeTimers();
    setTimeout(() => {
        expect(
            wrapper
                .find('.currencyCardTitle')
                .render()
                .text(),
        ).toBe('EUR/USD');
    }, 1500);
    jest.runAllTimers();
    // expect(wrapper.find('.currencyCardTitle').text).toBe('EUR/USD');
    // const { getByText, getByPlaceholderText } = render(<CurrencyWall currencyTicker={'EUR/USD'} />);
    // const currencyTitle = await getByText('EUR/USD');
    // expect(currencyTitle).toBeInTheDocument();

    // const input = getByPlaceholderText('EUR/USD');
    // expect(input.value).toBe('');
    // fireEvent.change(input, { target: { value: 'EUR/USD' } });
    // expect(input.value).toBe('EUR/USD');
    // fireEvent.submit(getByText('Search'));
    // expect(handleSubmit).toHaveBeenCalled();
});
