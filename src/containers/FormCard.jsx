import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@context/AppContext';
import Image from 'next/image';
import styles from '@styles/FormCard.module.scss';

import createIcon from '@icons/Icon_crear.svg';
import confirmIcon from '@icons/Icon_confirmar.svg';
import cancelarIcon from '@icons/Icon_cancelar.svg';
import SimpleInput from '@components/SimpleInput';

const FormCard = () => {
  const { state, handlerCreating, handlerEditing, updateCurrentEdit, updateValuesInputs } = useContext(AppContext);
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
    closeCreate();
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
    closeEdit();
  };

  useEffect(() => {
    if (state.isEditing) {
      extendCard();
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
