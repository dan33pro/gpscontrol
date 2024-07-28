import React, { useContext, useState, useEffect } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/SimpleInput.module.scss';

const SimpleInput = ({ type }) => {
  const { state, valueBrand, updateBrand, valueBranch, updateBranch, valueApplicant, updateApplicant, lastDelete } = useContext(AppContext);
  const [currentIcon, setCurrentIcon] = useState(getIconClass());

  const [isDisabled, setIsDisabled] = useState(true);
  const toggleDisabled = (newValue) => {
    setIsDisabled(newValue);
  };

  const [isHiddenValue, setIsHiddenValue] = useState(false);

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

  useEffect(() => {
    if (lastDelete.registro != null && lastDelete.index != -1) {
      setIsHiddenValue(true);
      setTimeout(() => {
        setIsHiddenValue(false);
      }, 400);
    }
  }, [lastDelete]);

  return (
    <div className={styles.SimpleInput}>
      <div className={`${styles['container-icon']} ${styles[currentIcon]}`}></div>
      <div className={styles.inputContainer}>
        <input className={`${isHiddenValue ? styles.isHiidenValue : ''}`} type="text" value={getValue()} onChange={handlerInput} placeholder={getPlaceholder()} disabled={isDisabled} />
        <div className={`${styles.transformedValue} ${isHiddenValue ? styles.isAnimated : ''}`}>{getValue()}</div>
      </div>
    </div>
  );
};

export default SimpleInput;
