import { IDenominations } from './interfaces';
import BigNumber from 'bignumber.js';

export const denominations: IDenominations = {
  wei: BigNumber(1),
  kwei: BigNumber(1000),
  mwei: BigNumber(1000000),
  gwei: BigNumber(1000000000),
  microether: BigNumber(1000000000000),
  miliether: BigNumber(1000000000000000),
  ether: BigNumber(1000000000000000000),
};
