import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { getInteresteds, deleteInterested } from '@services/api/interesteds';

import SimpleTable from '@components/SimpleTable';
import AppContext from '@context/AppContext';

jest.mock('@services/api/interesteds', () => ({
  getInteresteds: jest.fn(),
  deleteInterested: jest.fn(),
}));

const mockContextValue = {
  state: { isEditing: false },
  currentEdit: { registro: null, index: -1 },
  updateCurrentEdit: jest.fn(),
  updateLastDelete: jest.fn(),
  handlerEditing: jest.fn(),
  updateValuesInputs: jest.fn(),
  registros: [],
  setRegistros: jest.fn(),
};

describe('SimpleTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama a getInteresteds y establece registros en el estado', async () => {
    const mockRegistros = [
      { brand: 'Brand1', branch: 'Branch1', applicant: 'Applicant1', id_interested: 1 },
      { brand: 'Brand2', branch: 'Branch2', applicant: 'Applicant2', id_interested: 2 },
    ];
    getInteresteds.mockResolvedValue({ status: 200, data: mockRegistros });

    render(
      <AppContext.Provider value={mockContextValue}>
        <SimpleTable />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(mockContextValue.setRegistros).toHaveBeenCalledWith(mockRegistros);
    });
  });

  it('edita un registro correctamente', () => {
    const registro = { brand: 'Brand1', branch: 'Branch1', applicant: 'Applicant1', id_interested: 1 };
    const updatedContextValue = {
      ...mockContextValue,
      registros: [registro],
    };

    render(
      <AppContext.Provider value={updatedContextValue}>
        <SimpleTable />
      </AppContext.Provider>
    );

    const editButton = screen.getAllByRole('button', { name: '' })[0];
    fireEvent.click(editButton);

    expect(mockContextValue.updateCurrentEdit).toHaveBeenCalledWith({ registro, index: 0 });
    expect(mockContextValue.updateValuesInputs).toHaveBeenCalledWith(registro.brand, registro.branch, registro.applicant);
    expect(mockContextValue.handlerEditing).toHaveBeenCalledWith(true);
  });

  it('elimina un registro correctamente', async () => {
    const registro = { brand: 'Brand1', branch: 'Branch1', applicant: 'Applicant1', id_interested: 1 };
    const registroDos = { brand: 'Brand2', branch: 'Branch2', applicant: 'Applicant2', id_interested: 2 };
    const updatedContextValue = {
      ...mockContextValue,
      registros: [registro, registroDos],
    };

    render(
      <AppContext.Provider value={updatedContextValue}>
        <SimpleTable />
      </AppContext.Provider>
    );

    deleteInterested.mockResolvedValue({ status: 200, data: [] });
    const deleteButton = screen.getAllByRole('button', { name: '' })[1];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockContextValue.updateLastDelete).toHaveBeenCalledWith({ registro, index: 0 });
      expect(mockContextValue.updateValuesInputs).toHaveBeenCalledWith(registro.brand, registro.branch, registro.applicant);
    });
  });
});
