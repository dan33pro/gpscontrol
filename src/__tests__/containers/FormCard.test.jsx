import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormCard from '@containers/FormCard';
import AppContext from '@context/AppContext';

const mockContext = {
  state: {
    isCreating: false,
    isEditing: false,
  },
  handlerCreating: jest.fn(),
  handlerEditing: jest.fn(),
  currentEdit: { registro: null, index: -1 },
  lastDelete: { registro: null, index: -1 },
  updateCurrentEdit: jest.fn(),
  updateValuesInputs: jest.fn(),
  valueBrand: '',
  valueBranch: '',
  valueApplicant: '',
  registros: [],
  setRegistros: jest.fn(),
};

jest.mock('@services/api/interesteds', () => ({
  addInterested: jest.fn().mockResolvedValue({ status: 201, data: {} }),
  updateInterested: jest.fn().mockResolvedValue({ status: 200, data: {} }),
}));

describe('FormCard', () => {
  beforeEach(() => {
    mockContext.state.isCreating = false;
    mockContext.state.isEditing = false;
    mockContext.currentEdit = { registro: null, index: -1 };
    mockContext.valueBrand = '';
    mockContext.valueBranch = '';
    mockContext.valueApplicant = '';
    mockContext.registros = [];
  });

  it('representa el contenedor adecuadamente', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    expect(screen.getByAltText('Icono de crear registro')).toBeInTheDocument();
  });

  it('Debe controlar el clic del botón de creación y mostrar los botones de creación', async () => {
    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    const createButton = screen.getByAltText('Icono de crear registro');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockContext.handlerCreating).toHaveBeenCalledWith(true);
    });
  });

  it('Debe manejar el clic del botón cerrar creación', async () => {
    mockContext.state.isCreating = true;

    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockContext.handlerCreating).toHaveBeenCalledWith(false));
  });

  it('Debería manejar el clic del botón de confirmación de creación', async () => {
    mockContext.state.isCreating = true;
    mockContext.valueBrand = 'Brand';
    mockContext.valueBranch = 'Branch';
    mockContext.valueApplicant = 'Applicant';

    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    const createButton = screen.getByText('Crear');
    fireEvent.click(createButton);

    await waitFor(() => expect(mockContext.setRegistros).toHaveBeenCalled());
  });

  it('Debe controlar el clic del botón de edición y mostrar los botones de edición.', async () => {
    mockContext.state.isEditing = true;

    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    expect(screen.getByAltText('icono de cancelar')).toBeInTheDocument();
    expect(screen.getByAltText('icono de confirmar')).toBeInTheDocument();
  });

  it('Debe manejar el clic del botón de cerrar edición', async () => {
    mockContext.state.isEditing = true;

    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    const cancelButton = screen.getByAltText('icono de cancelar');
    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockContext.handlerEditing).toHaveBeenCalledWith(false));
  });

  it('Debería manejar el clic del botón de confirmación de edición', async () => {
    mockContext.state.isEditing = true;
    mockContext.currentEdit.registro = { id_interested: 1 };
    mockContext.valueBrand = 'Brand';
    mockContext.valueBranch = 'Branch';
    mockContext.valueApplicant = 'Applicant';

    render(
      <AppContext.Provider value={mockContext}>
        <FormCard />
      </AppContext.Provider>
    );

    const confirmButton = screen.getByAltText('icono de confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => expect(mockContext.setRegistros).toHaveBeenCalled());
  });
});
