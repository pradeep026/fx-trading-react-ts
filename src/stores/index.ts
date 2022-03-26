import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rxRatesReducer from './slices/fxRates';

export const store = configureStore({
    reducer: {
        fxRates: rxRatesReducer,
    },
});

/**
 * export store slice actions
 */
export * from './slices/fxRates';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
