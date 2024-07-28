import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import SimpleInput from '@components/SimpleInput';
import AppContext from '@context/AppContext';

const renderComponent = (contextValue, type) => {
  return render(
    <AppContext.Provider value={contextValue}>
      <SimpleInput type={type} />
    </AppContext.Provider>
  );
};

describe('SimpleInput Component', () => {
  const contextValue = {
    state: {
      isEditing: false,
      isCreating: false,
    },
    valueBrand: 'Test Brand',
    updateBrand: jest.fn(),
    valueBranch: 'Test Branch',
    updateBranch: jest.fn(),
    valueApplicant: 'Test Applicant',
    updateApplicant: jest.fn(),
    lastDelete: { registro: null, index: -1 },
  };

  it('representa con el correcto placeholder y value para el tipo brand', () => {
    renderComponent(contextValue, 'brand');

    expect(screen.getByPlaceholderText('Marca')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Brand')).toBeInTheDocument();
  });

  it('representa con el correcto placeholder y value para el tipo branch', () => {
    renderComponent(contextValue, 'branch');

    expect(screen.getByPlaceholderText('Localidad')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Branch')).toBeInTheDocument();
  });

  it('representa con el correcto placeholder y value para el tipo applicant', () => {
    renderComponent(contextValue, 'applicant');

    expect(screen.getByPlaceholderText('Nombres Apellidos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Applicant')).toBeInTheDocument();
  });

  it('Actualiza el valor y llama a la función de actualización cuando cambia el input tipo brand.', () => {
    renderComponent(contextValue, 'brand');

    const input = screen.getByPlaceholderText('Marca');
    fireEvent.change(input, { target: { value: 'New Brand' } });

    expect(contextValue.updateBrand).toHaveBeenCalledWith('New Brand');
  });

  it('Actualiza el valor y llama a la función de actualización cuando cambia el input tipo branch', () => {
    renderComponent(contextValue, 'branch');

    const input = screen.getByPlaceholderText('Localidad');
    fireEvent.change(input, { target: { value: 'New Branch' } });

    expect(contextValue.updateBranch).toHaveBeenCalledWith('New Branch');
  });

  it('Actualiza el valor y llama a la función de actualización cuando cambia el input tipo applicant', () => {
    renderComponent(contextValue, 'applicant');

    const input = screen.getByPlaceholderText('Nombres Apellidos');
    fireEvent.change(input, { target: { value: 'New Applicant' } });

    expect(contextValue.updateApplicant).toHaveBeenCalledWith('New Applicant');
  });

  it('Deshabilita la entrada cuando isEditing y isCreating son falsas', () => {
    renderComponent(contextValue, 'brand');

    const input = screen.getByPlaceholderText('Marca');
    expect(input).toBeDisabled();
  });

  it('Habilita la entrada cuando isEditing o isCreating son verdaderos', () => {
    const contextValueEditing = {
      ...contextValue,
      state: {
        isEditing: true,
        isCreating: false,
      },
    };
    renderComponent(contextValueEditing, 'brand');

    const input = screen.getByPlaceholderText('Marca');
    expect(input).toBeEnabled();
  });

  it('oculta el valor temporalmente cuando se establece lastDelete', () => {
    const contextValueWithDelete = {
      ...contextValue,
      lastDelete: { registro: 'Some Registro', index: 0 },
    };
    renderComponent(contextValueWithDelete, 'brand');

    const input = screen.getByPlaceholderText('Marca');
    expect(input).toHaveClass('isHiidenValue');
  });
});
