declare module 'react-country-state-city' {
    import { FC } from 'react';
  
    interface Country {
      id: string;
      name: string;
    }
  
    interface State {
      id: string;
      name: string;
      country_id: string;
    }
  
    interface City {
      id: string;
      name: string;
      state_id: string;
    }
  
    interface CountrySelectProps {
      value?: Country | null;
      onChange: (value: Country | null) => void;
      placeHolder?: string;
      className?: string;
    }
  
    interface StateSelectProps {
      countryid: number;
      value?: State | null;
      onChange: (value: State | null) => void;
      placeHolder?: string;
      className?: string;
      isDisabled?: boolean;
    }
  
    interface CitySelectProps {
      countryid: number;
      stateid: number;
      value?: City | null;
      onChange: (value: City | null) => void;
      placeHolder?: string;
      className?: string;
      isDisabled?: boolean;
    }
  
    export const CountrySelect: FC<CountrySelectProps>;
    export const StateSelect: FC<StateSelectProps>;
    export const CitySelect: FC<CitySelectProps>;
  }
  