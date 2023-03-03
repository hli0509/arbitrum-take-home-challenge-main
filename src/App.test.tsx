import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BigNumber from 'bignumber.js';

import App from './App';

import { provider } from './utils/index';
import { denominations } from './constants';

test('renders every denomination', () => {
    render(<App />);
    for (let denomination in denominations) {
        const den = screen.getByText(denomination);
        expect(den).toBeInTheDocument();
    }
});

test('updates on input', async () => {
    const user = userEvent.setup();
    render(<App />);
    for (let denomination in denominations) {
        const input = screen.getByTestId(denomination);
        expect(input).toHaveValue('0');
    }

    const weiInput = screen.getByTestId('wei');
    await user.type(weiInput, '2');
    expect(weiInput).toHaveValue('2');

    for (const [d, v] of Object.entries(denominations)) {
        const input = screen.getByTestId(d);
        const expected = BigNumber(2).dividedBy(v).toString(10);
        expect(input).toHaveValue(expected);
    }
});

async function getEthPrice() {
    const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    );
    const data = await response.json();
    return data.ethereum;
}

test('updates eth price', async () => {
    const user = userEvent.setup();
    render(<App />);

    const weiInput = screen.getByTestId('wei');
    await user.type(weiInput, '2');

    const ethereum = await getEthPrice();
    let input = screen.getByTestId('priceOfEth');
    expect(input).toHaveTextContent(`${ethereum.usd.toString(10)} USD`);

    input = screen.getByTestId('priceOfInput');
    expect(input).toHaveTextContent(
        `${BigNumber(ethereum.usd).times(2).dividedBy(denominations['ether']).toString(10)} USD`,
    );
});

test('updates gas price', async () => {
    render(<App />);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        const gasPriceInEther = screen.getByTestId('gasPriceInEther');
        const gasPriceInUSD = screen.getByTestId('gasPriceInUSD');

        const gasPrice = await provider.getGasPrice();
        const ethPrice = await getEthPrice();

        const inEther = BigNumber(gasPrice.toNumber() / denominations['ether'].toNumber());
        const inUSD =
            gasPrice.toNumber() *
            BigNumber(ethPrice.usd).dividedBy(denominations['ether']).toNumber();

        await waitFor(() =>
            expect(gasPriceInEther).toHaveTextContent(`${inEther.toString(10)} ETH`),
        );
        await waitFor(() => expect(gasPriceInUSD).toHaveTextContent(`${inUSD.toString(10)} USD`));
    });
});
