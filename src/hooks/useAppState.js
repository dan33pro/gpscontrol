import { useState } from 'react';

const useAppState = () => {
  const [state, setState] = useState({
    isEditing: false,
    isCreating: false,
  });

  const handlerEditing = (newValue) => {
    setState({
      isEditing: newValue,
      isCreating: false,
    });
  };

  const handlerCreating = (newValue) => {
    setState({
      isEditing: false,
      isCreating: newValue,
    });
  };

  const [currentEdit, setCurrentEdit] = useState({
    registro: null,
    index: -1,
  });

  const updateCurrentEdit = (current) => {
    setCurrentEdit({
      registro: current.registro,
      index: current.index,
    });
  };

  const [lastDelete, setLastDelete] = useState({
    registro: null,
    index: -1,
  });

  const updateLastDelete = (current) => {
    setLastDelete({
      registro: current.registro,
      index: current.index,
    });
  };

  const [valueBrand, setValueBrand] = useState('');
  const updateBrand = (brand) => setValueBrand(brand);

  const [valueBranch, setValueBranch] = useState('');
  const updateBranch = (branch) => setValueBranch(branch);

  const [valueApplicant, setValueApplicant] = useState('');
  const updateApplicant = (applicant) => setValueApplicant(applicant);

  const updateValuesInputs = (brand, branch, applicant) => {
    setValueBrand(brand);
    setValueBranch(branch);
    setValueApplicant(applicant);
  };

  return {
    state,
    handlerEditing,
    handlerCreating,
    valueBrand,
    updateBrand,
    valueBranch,
    updateBranch,
    valueApplicant,
    updateApplicant,
    currentEdit,
    updateCurrentEdit,
    updateValuesInputs,
    lastDelete,
    updateLastDelete,
  };
};

export default useAppState;
