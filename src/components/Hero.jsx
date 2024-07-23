import React from 'react';
import Image from 'next/image';

import styles from '@styles/Hero.module.scss';

import logo_uno from '@logos/Imagologo_motion.svg';
import hero_img from '@images/Telefono-01.png';

const Hero = () => {
  return (
    <section className={styles.Hero}>
      <Image src={logo_uno} className={styles.logo} />
        <article className={styles['main-info']}>
            <div className={styles['image-container']}>
                <h2>BIENVENIDO A</h2>
                <Image src={hero_img} />
                <h3>MONITORING INNOVATION</h3>
            </div>
            <ul>
                <li><a href="https://monitoringinnovation.com/" target='_blank'>MONITORINGINNOVATION</a></li>
                <li><a href="https://gpscontrol.co/"  target='_blank'>GPS CONTROL</a></li>
                <li><a href=""  target='_blank'>Link repo front</a></li>
                <li><a href=""  target='_blank'>Link repo back</a></li>
            </ul>
        </article>
    </section>
  );
};

export default Hero;
