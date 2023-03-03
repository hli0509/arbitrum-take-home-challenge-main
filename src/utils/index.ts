import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import BigNumber from 'bignumber.js';

import { IPrice, IGas, IDenominations } from '../interfaces';
import { denominations } from '../constants';

export const provider = new providers.JsonRpcProvider(process.env.REACT_APP_MAINNET_RPC);

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function useEtherPrice(inputs: IDenominations) {
    const [ethPrice, setEthPrice] = useState<IPrice>({
        ofEth: BigNumber(0),
        ofInput: BigNumber(0),
    });
    const [gasPrice, setGasPrice] = useState<IGas>({
        inGwei: BigNumber(0),
        inUSD: BigNumber(0),
    });
    const debouncedInputs = useDebounce(inputs, 1000);

    useEffect(() => {
        async function getPrice() {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
            );
            const data = await response.json();
            const ethPrice = BigNumber(data.ethereum.usd);
            const inputPrice = inputs.ether.times(ethPrice);
            setEthPrice({
                ofEth: ethPrice,
                ofInput: inputPrice,
            });
        }

        async function getGas() {
            await getPrice();
            const tmp = await provider.getGasPrice();
            const gasPrice = BigNumber(tmp.toNumber());
            const inGwei = gasPrice.div(denominations.ether).times(denominations.gwei);
            const inUSD = ethPrice.ofEth
                .div(denominations.ether)
                .times(denominations.gwei)
                .times(inGwei);

            setGasPrice({ inGwei, inUSD });
        }

        getGas();
    }, [debouncedInputs]);
    return { ethPrice, gasPrice };
}
