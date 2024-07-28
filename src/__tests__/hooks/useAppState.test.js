import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import useAppState from '@hooks/useAppState';

describe('useAppState', () => {
  it('Debe inicializarse con el estado predeterminado', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current.state).toEqual({ isEditing: false, isCreating: false });
    expect(result.current.currentEdit).toEqual({ registro: null, index: -1 });
    expect(result.current.lastDelete).toEqual({ registro: null, index: -1 });
    expect(result.current.valueBrand).toBe('');
    expect(result.current.valueBranch).toBe('');
    expect(result.current.valueApplicant).toBe('');
    expect(result.current.registros).toEqual([]);
  });

  it('Debería actualizar el estado isEditing', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.handlerEditing(true);
    });

    expect(result.current.state.isEditing).toBe(true);
    expect(result.current.state.isCreating).toBe(false);
  });

  it('Debería actualizar el estado isCreating', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.handlerCreating(true);
    });

    expect(result.current.state.isEditing).toBe(false);
    expect(result.current.state.isCreating).toBe(true);
  });

  it('Debería actualizarse la edición actual', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateCurrentEdit({ registro: 'test', index: 1 });
    });

    expect(result.current.currentEdit).toEqual({ registro: 'test', index: 1 });
  });

  it('Debería actualizar lastDelete', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateLastDelete({ registro: 'test', index: 1 });
    });

    expect(result.current.lastDelete).toEqual({ registro: 'test', index: 1 });
  });

  it('Debería actualizar valueBrand', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateBrand('Brand');
    });

    expect(result.current.valueBrand).toBe('Brand');
  });

  it('Debería actualizar valueBranch', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateBranch('Branch');
    });

    expect(result.current.valueBranch).toBe('Branch');
  });

  it('Debería actualizar el valor del solicitante', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateApplicant('Applicant');
    });

    expect(result.current.valueApplicant).toBe('Applicant');
  });

  it('Debería actualizar valuesInputs', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.updateValuesInputs('Brand', 'Branch', 'Applicant');
    });

    expect(result.current.valueBrand).toBe('Brand');
    expect(result.current.valueBranch).toBe('Branch');
    expect(result.current.valueApplicant).toBe('Applicant');
  });

  it('Debería actualizar los registros', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.setRegistros([{ id: 1, name: 'Registro' }]);
    });

    expect(result.current.registros).toEqual([{ id: 1, name: 'Registro' }]);
  });
});
