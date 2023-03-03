import React from 'react';
import BigNumber from 'bignumber.js';
import { ICard } from '../interfaces';

export const Card = ({ value, denomination, onChange }: ICard): JSX.Element => {
    return (
        <div className="relative mb-2 mx-5 rounded-md shadow-sm">
            <input
                type="number"
                data-testid={denomination}
                className="block w-full rounded-lg border border-gray-200 py-2 pl-2 pr-24 text-gray-900 text-right placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={event => onChange(BigNumber(event.target.value))}
                value={isNaN(Number(value)) ? 0 : value.toString(10)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center bg-gray-500 w-24">
                <span className="text-white sm:text-sm mx-auto">{denomination}</span>
            </div>
        </div>
    );
};
