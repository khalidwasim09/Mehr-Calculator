'use client';

/**
 * CalculatorContext — Central State Management for the Wizard
 * 
 * Uses useReducer for predictable, debuggable state transitions.
 * All wizard step data flows through this context.
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import {
  CalculatorState,
  CalculatorAction,
  FinancialProfile,
  FamilyContext,
  BrideProfile,
  MehrPreferences,
} from '../lib/types/calculator';
import { MetalPrices } from '../lib/types/currency';
import { getFallbackPrices } from '../lib/engine/MetalPriceService';

/* ── Initial State ── */

const initialState: CalculatorState = {
  currentStep: 1,
  totalSteps: 5,
  financial: {
    annualIncome: 0,
    currency: 'USD',
    employmentStatus: 'employed',
    savingsBracket: 'under_5k',
    hasDebts: false,
    debtAmount: 0,
  },
  family: {
    countryOfOrigin: '',
    cityRegion: '',
    sisterMehr: null,
    motherMehr: null,
    culturalExpectation: 3,
  },
  bride: {
    educationLevel: 'bachelors',
    professionalStatus: 'working',
    ageBracket: '26_30',
  },
  preferences: {
    madhab: 'hanafi',
    form: 'cash',
    goldKarat: 22,
    paymentStructure: 'full_prompt',
    customSplit: { promptPercentage: 60, deferredPercentage: 40 },
    metalPrices: getFallbackPrices(),
  },
  isComplete: false,
};

/* ── Reducer ── */

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: Math.max(1, Math.min(action.payload, state.totalSteps)) };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case 'UPDATE_FINANCIAL':
      return {
        ...state,
        financial: { ...state.financial, ...action.payload },
      };

    case 'UPDATE_FAMILY':
      return {
        ...state,
        family: { ...state.family, ...action.payload },
      };

    case 'UPDATE_BRIDE':
      return {
        ...state,
        bride: { ...state.bride, ...action.payload },
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case 'SET_METAL_PRICES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          metalPrices: action.payload,
        },
      };

    case 'MARK_COMPLETE':
      return { ...state, isComplete: true };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

/* ── Context ── */

interface CalculatorContextValue {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFinancial: (data: Partial<FinancialProfile>) => void;
  updateFamily: (data: Partial<FamilyContext>) => void;
  updateBride: (data: Partial<BrideProfile>) => void;
  updatePreferences: (data: Partial<MehrPreferences>) => void;
  setMetalPrices: (prices: MetalPrices) => void;
  markComplete: () => void;
  reset: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

/* ── Provider ── */

interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const updateFinancial = useCallback((data: Partial<FinancialProfile>) => {
    dispatch({ type: 'UPDATE_FINANCIAL', payload: data });
  }, []);

  const updateFamily = useCallback((data: Partial<FamilyContext>) => {
    dispatch({ type: 'UPDATE_FAMILY', payload: data });
  }, []);

  const updateBride = useCallback((data: Partial<BrideProfile>) => {
    dispatch({ type: 'UPDATE_BRIDE', payload: data });
  }, []);

  const updatePreferences = useCallback((data: Partial<MehrPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: data });
  }, []);

  const setMetalPrices = useCallback((prices: MetalPrices) => {
    dispatch({ type: 'SET_METAL_PRICES', payload: prices });
  }, []);

  const markComplete = useCallback(() => {
    dispatch({ type: 'MARK_COMPLETE' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value: CalculatorContextValue = {
    state,
    dispatch,
    goToStep,
    nextStep,
    prevStep,
    updateFinancial,
    updateFamily,
    updateBride,
    updatePreferences,
    setMetalPrices,
    markComplete,
    reset,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

/* ── Hook ── */

export function useCalculator(): CalculatorContextValue {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
