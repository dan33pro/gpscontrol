import React, { useState, useContext, useEffect } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/SimpleTable.module.scss';
import { getInteresteds, deleteInterested } from '@services/api/interesteds';

const SimpleTable = () => {
  const { state, currentEdit, updateCurrentEdit, updateLastDelete, handlerEditing, updateValuesInputs, registros, setRegistros } = useContext(AppContext);

  const editRegistro = (registro, index) => {
    updateCurrentEdit({ registro, index });
    updateValuesInputs(registro.brand, registro.branch, registro.applicant);
    handlerEditing(true);
  };

  const [currentDelete, setCurrentDelete] = useState({
    registro: null,
    index: -1,
  });

  const updateCurrentDelete = (current) => {
    setCurrentDelete({
      registro: current.registro,
      index: current.index,
    });
  };

  const deleteRegistro = (registro, index) => {
    deleteInterested(registro.id_interested);
    updateCurrentDelete({ registro, index });
    updateLastDelete({ registro, index });
    const newRegistros = registros.filter((registro, i) => i != index);
    setTimeout(() => {
      updateCurrentDelete({ registro: null, index: -1 });
      setRegistros(newRegistros);
      updateValuesInputs(registro.brand, registro.branch, registro.applicant);
      if (state.isEditing) {
        handlerEditing(false);
        updateCurrentEdit({ registro: null, index: -1 });
      }
    }, 200);
  };

  const getData = async () => {
    const res = await getInteresteds();
    if (res.status == 200) {
      setRegistros(res.data);
    }
  };

  useEffect(() => {
    if (registros.length == 0) {
      getData();
    }
  }, []);

  return (
    <aside className={styles.SimpleTable}>
      <ul className={styles['titles']}>
        <li>Marca</li>
        <li>Sucursal</li>
        <li>Aspirante</li>
      </ul>
      <section className={styles['info-container']}>
        {registros.map((registro, index) => {
          return (
            <ul
              className={`
                  ${styles['registro']}
                  ${currentDelete.index == index ? styles.isDeleting : ''}`}
              key={`registro-${index}`}
            >
              <li>{registro.brand}</li>
              <li>{registro.branch}</li>
              <li>{registro.applicant}</li>
              <button
                disabled={!(currentEdit.index == index || !currentEdit.registro)}
                className={`
                    ${styles['item-btn']}
                    ${styles['edit']}
                    ${currentEdit.index == index || !currentEdit.registro ? styles.isActive : ''}`}
                onClick={() => editRegistro(registro, index)}
              ></button>
              <button
                disabled={!(currentEdit.index == index || !currentEdit.registro)}
                className={`
                    ${styles['item-btn']}
                    ${styles['delete']}
                    ${currentEdit.index == index || !currentEdit.registro ? styles.isActive : ''}`}
                onClick={() => deleteRegistro(registro, index)}
              ></button>
            </ul>
          );
        })}
      </section>
    </aside>
  );
};

export default SimpleTable;
