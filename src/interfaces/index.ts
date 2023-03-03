import BigNumber from 'bignumber.js';
import { tmpdir } from 'os';

export type Denomination = 'wei' | 'kwei' | 'mwei' | 'gwei' | 'microether' | 'miliether' | 'ether';

export interface IInput {
    multiplier: BigNumber;
    value: BigNumber;
    denomination: string;
}

export interface ICard {
    value: BigNumber;
    denomination: Denomination;
    onChange: (value: BigNumber) => void;
}

export type IDenominations = {
    [key in Denomination]: BigNumber;
};

export interface IGas {
    inGwei: BigNumber;
    inUSD: BigNumber;
}

export interface IPrice {
    ofEth: BigNumber;
    ofInput: BigNumber;
}
