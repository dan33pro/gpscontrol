import React, { useState, useContext } from 'react';
import AppContext from '@context/AppContext';
import styles from '@styles/SimpleTable.module.scss';

const dataDefault = [
  {
    brand: 'Mazda',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Mercedez',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Chevrolet',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Suzuiki',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Renault',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Nissan',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
  {
    brand: 'Toyota',
    branch: 'Chapinero',
    applicant: 'David Sandoval',
  },
];

const SimpleTable = () => {
  const { currentEdit, updateCurrentEdit, updateLastDelete, handlerEditing, updateValuesInputs } = useContext(AppContext);
  const [registros, setRegistros] = useState(dataDefault);

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
    updateCurrentDelete({ registro, index });
    updateLastDelete({ registro, index });
    const newRegistros = registros.filter((registro, i) => i != index);
    setTimeout(() => {
      updateCurrentDelete({ registro: null, index: -1 });
      setRegistros(newRegistros);
      updateValuesInputs(registro.brand, registro.branch, registro.applicant);
    }, 200);
  };

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
