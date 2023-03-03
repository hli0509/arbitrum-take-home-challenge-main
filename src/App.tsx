import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useQueryParams, NumberParam } from 'use-query-params';

import './App.css';
import { Card } from './components/card';
import { useEtherPrice } from './utils';
import { IDenominations, Denomination } from './interfaces';
import { denominations } from './constants';

function App() {
    const [inputs, setInputs] = useState<IDenominations>({
        wei: BigNumber(0),
        kwei: BigNumber(0),
        mwei: BigNumber(0),
        gwei: BigNumber(0),
        microether: BigNumber(0),
        miliether: BigNumber(0),
        ether: BigNumber(0),
    });

    const [queryParams, setQueryParams] = useQueryParams({
        wei: NumberParam,
        kwei: NumberParam,
        mwei: NumberParam,
        gwei: NumberParam,
        microether: NumberParam,
        miliether: NumberParam,
        ether: NumberParam,
    });

    const { ethPrice, gasPrice } = useEtherPrice(inputs);

    function updateDenominations(denomination: Denomination, value: BigNumber) {
        const newValues: IDenominations = { ...inputs, [denomination]: value };
        for (const d of Object.keys(newValues) as Denomination[]) {
            if (d !== denomination) {
                const conversionRate = denominations[denomination].div(denominations[d]);
                newValues[d] = value.times(conversionRate);
            }
        }

        setInputs(newValues);
    }

    useEffect(() => {
        for (const [denomination, value] of Object.entries(queryParams)) {
            if (denomination in inputs && !!value) {
                updateDenominations(denomination as Denomination, BigNumber(value));
            }
        }
    }, [queryParams]);

    const handleInputChange = (denomination: Denomination, value: BigNumber) => {
        if (value.lt(0) || (denomination === 'wei' && !value.isInteger())) {
            return; // Ignore invalid input
        }
        updateDenominations(denomination, value);

        let newParams = {
            wei: undefined,
            kwei: undefined,
            mwei: undefined,
            gwei: undefined,
            microether: undefined,
            miliether: undefined,
            ether: undefined,
        };

        setQueryParams({
            ...newParams,
            [denomination]: value.toNumber(),
        });
    };

    return (
        <div className="container flex-1 mx-auto p-6">
            <div className="flex item-center justify-start">
                <h1 className="mr-auto text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Pretty ETH Converter
                </h1>
                <div className="flex flex-wrap justify-center px-3 py-2 mr-3 bg-gray-300 rounded-lg">
                    <span data-testid="priceOfEth" className="text-sm">
                        ETH: {ethPrice.ofEth.toFixed(2)} USD
                    </span>
                </div>
                <div className="flex flex-wrap justify-center px-3 py-2 bg-gray-300 rounded-lg">
                    <span data-testid="priceOfEth" className="text-sm">
                        Gas (Gwei): {gasPrice.inGwei.toFixed(2)} &asymp;{' '}
                        {gasPrice.inUSD.toFixed(10)} USD
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 place-content-around mt-10 py-5 bg-gray-100 rounded-lg max-w-md mx-auto">
                {Object.keys(inputs).map(d => (
                    <Card
                        key={d}
                        value={inputs[d as Denomination]}
                        denomination={d as Denomination}
                        onChange={value => handleInputChange(d as Denomination, value)}
                    />
                ))}
                <div className="flex flex-wrap justify-center mx-5 px-8 py-3 bg-gray-300 rounded-lg">
                    <p data-testid="priceOfInput" className="text-2sm">
                        = {ethPrice.ofInput.toString()} USD
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
