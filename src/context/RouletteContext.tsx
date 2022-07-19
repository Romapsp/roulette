import { createContext } from 'react';

import type { IPrizesWrapperProps, OptionsType } from '../types';

type WrapperType = {
  wrapperClassName?: string;
};

type PrizesWrapperType = {
  prizeListClassName?: string;
};

export interface IRouletteContextProps extends WrapperType, PrizesWrapperType {
  options: OptionsType;
  start: boolean;
  type: IPrizesWrapperProps['type'];
}

const RouletteContext = createContext({} as IRouletteContextProps);

export default RouletteContext;
