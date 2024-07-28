import Image from 'next/image';
import React from 'react';

import large_logo from '@logos/Imagologotipo_motion.svg';
import styles from '@styles/MainSection.module.scss';
import FormCard from '@containers/FormCard';
import SimpleTable from '@components/SimpleTable';

const MainSection = () => {
  return (
    <section className={styles.MainSection}>
      <div className={styles['aside-container']}>
        <FormCard />
        <SimpleTable />
      </div>
      <Image src={large_logo} alt="Large Motion Logo" className={styles['large-logo']} />
    </section>
  );
};

export default MainSection;
