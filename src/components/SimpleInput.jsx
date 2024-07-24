import React, { useContext, useState, useEffect } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/SimpleInput.module.scss';

const SimpleInput = ({ type }) => {
  const { state, valueBrand, updateBrand, valueBranch, updateBranch, valueApplicant, updateApplicant } = useContext(AppContext);
  const [currentIcon, setCurrentIcon] = useState(getIconClass());

  const [isDisabled, setIsDisabled] = useState(true);
  const toggleDisabled = (newValue) => {
    setIsDisabled(newValue);
  };

  function getIconClass() {
    switch (type) {
      case 'brand':
        return state.isEditing || state.isCreating ? 'icon-brand-focus' : 'icon-brand';
      case 'branch':
        return state.isEditing || state.isCreating ? 'icon-branch-focus' : 'icon-branch';
      case 'applicant':
        return state.isEditing || state.isCreating ? 'icon-applicant-focus' : 'icon-applicant';
      default:
        return '';
    }
  }

  function getPlaceholder() {
    switch (type) {
      case 'brand':
        return 'Marca';
      case 'branch':
        return 'Localidad';
      case 'applicant':
        return 'Nombres Apellidos';
      default:
        return '';
    }
  }

  function getValue() {
    switch (type) {
      case 'brand':
        return valueBrand;
      case 'branch':
        return valueBranch;
      case 'applicant':
        return valueApplicant;
      default:
        return '';
    }
  }

  function handlerInput(event) {
    const newValue = event.target.value;
    switch (type) {
      case 'brand':
        updateBrand(newValue);
        break;
      case 'branch':
        updateBranch(newValue);
        break;
      case 'applicant':
        updateApplicant(newValue);
        break;
    }
  }

  useEffect(() => {
    setCurrentIcon(getIconClass());
    toggleDisabled(!state.isEditing && !state.isCreating);
  }, [state.isEditing, state.isCreating]);

  return (
    <div className={styles.SimpleInput}>
      <div className={`${styles['container-icon']} ${styles[currentIcon]}`}></div>
      <input type="text" value={getValue()} onChange={handlerInput} placeholder={getPlaceholder()} disabled={isDisabled} />
    </div>
  );
};

export default SimpleInput;
