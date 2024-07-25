import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import styles from '@styles/FormCard.module.scss';

import { addInterested, updateInterested } from '@services/api/interesteds';

import createIcon from '@icons/Icon_crear.svg';
import confirmIcon from '@icons/Icon_confirmar.svg';
import cancelarIcon from '@icons/Icon_cancelar.svg';
import SimpleInput from '@components/SimpleInput';

const FormCard = () => {
  const { state, handlerCreating, handlerEditing, currentEdit, updateCurrentEdit, updateValuesInputs, valueBrand, valueBranch, valueApplicant, registros, setRegistros } = useContext(AppContext);
  const [isVisibleBTNs, setIsVisibleBTNs] = useState(false);
  const [isExtendCard, setIsExtendCard] = useState(false);

  const extendCard = () => {
    setIsExtendCard(true);
    setTimeout(() => {
      setIsVisibleBTNs(true);
    }, 10);
  };

  const contractCard = () => {
    setIsExtendCard(false);
    setTimeout(() => {
      setIsVisibleBTNs(false);
    }, 100);
    updateValuesInputs('', '', '');
  };

  // Creación Registros
  const openCreate = () => {
    handlerCreating(true);
    extendCard();
  };

  const closeCreate = () => {
    contractCard();
    setTimeout(() => {
      handlerCreating(false);
    }, 100);
  };

  const confirmCreate = () => {
    const interested = {
      brand: valueBrand,
      branch: valueBranch,
      applicant: valueApplicant,
    };
    if (interested.brand.length < 1 || interested.branch.length < 1 || interested.applicant.length < 1) return;
    addInterestedHandler(interested);
    closeCreate();
  };

  const addInterestedHandler = async (interested) => {
    const res = await addInterested(interested);
    if (res.status == 201) {
      setRegistros([...registros, res.data]);
    }
  };

  // Edición Registros
  const closeEdit = () => {
    contractCard();
    updateCurrentEdit({ registro: null, index: -1 });
    setTimeout(() => {
      handlerEditing(false);
    }, 100);
  };

  const confirmEdit = () => {
    if ((valueBrand.length < 1 && valueBranch.length < 1 && valueApplicant.length < 1) || currentEdit.registro == null) return;
    editInterestedHandler(valueBrand, valueBranch, valueApplicant);
    closeEdit();
  };

  const editInterestedHandler = async (valueBrand, valueBranch, valueApplicant) => {
    let interested = {};

    if (valueBrand.length > 0) interested.brand = valueBrand;
    if (valueBranch.length > 0) interested.branch = valueBranch;
    if (valueApplicant.length > 0) interested.applicant = valueApplicant;

    const res = await updateInterested(currentEdit.registro.id_interested, interested);
    if (res.status == 200) {
      const newRegistros = registros.map((registro, i) => {
        if (currentEdit.index == i) return res.data;
        return registro;
      });
      setRegistros(newRegistros);
    }
  };

  useEffect(() => {
    if (state.isEditing) {
      extendCard();
    } else if (isExtendCard) {
      setIsExtendCard(false);
      setTimeout(() => {
        setIsVisibleBTNs(false);
      }, 100);
    }
  }, [state.isEditing]);

  return (
    <aside className={`${styles.FormCard} ${isExtendCard ? styles.extend : ''}`}>
      <button className={`${styles['btn-create']} ${state.isEditing ? styles.disabledBtn : ''}`} onClick={openCreate} disabled={state.isEditing}>
        <Image src={createIcon} alt="Icono de crear registro" />
      </button>
      <form className={styles['inputs-form']} onSubmit={(e) => e.preventDefault()}>
        <SimpleInput type={'brand'} />
        <SimpleInput type={'branch'} />
        <SimpleInput type={'applicant'} />
        {state.isCreating && (
          <div className={`${styles['create-btns']} ${isVisibleBTNs ? styles.isVisible : ''}`}>
            <button onClick={closeCreate}>Cancelar</button>
            <button onClick={confirmCreate}>Crear</button>
          </div>
        )}
        {state.isEditing && (
          <div className={`${styles['editing-btns']} ${isVisibleBTNs ? styles.isVisible : ''}`}>
            <button className={styles['edit-btn']} onClick={closeEdit}>
              <Image src={cancelarIcon} alt="icono de cancelar" />
            </button>
            <button className={styles['edit-btn']} onClick={confirmEdit}>
              <Image src={confirmIcon} alt="icono de confirmar" />
            </button>
          </div>
        )}
      </form>
    </aside>
  );
};

export default FormCard;
