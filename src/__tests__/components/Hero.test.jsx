import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Hero from '@components/Hero';

describe('Hero component', () => {
  it('representa el logotipo', () => {
    render(<Hero />);
    const logo = screen.getByAltText('Logo Motion');
    expect(logo).toBeInTheDocument();
  });

  it('Representa la imagen del hero', () => {
    render(<Hero />);
    const heroImage = screen.getByAltText('Imagen Hero');
    expect(heroImage).toBeInTheDocument();
  });

  it('representa el titulo del hero', () => {
    render(<Hero />);
    const mainTitle = screen.getByText('BIENVENIDO A');
    expect(mainTitle).toBeInTheDocument();
  });

  it('representa el subtitulo del hero', () => {
    render(<Hero />);
    const subtitle = screen.getByText('MONITORING INNOVATION');
    expect(subtitle).toBeInTheDocument();
  });

  it('representa los links con su correcta redirección', () => {
    render(<Hero />);
    const monitoringLink = screen.getByText('MONITORINGINNOVATION');
    expect(monitoringLink).toHaveAttribute('href', 'https://monitoringinnovation.com/');

    const gpsControlLink = screen.getByText('GPS CONTROL');
    expect(gpsControlLink).toHaveAttribute('href', 'https://gpscontrol.co/');

    const frontRepoLink = screen.getByText('Link repo front');
    expect(frontRepoLink).toHaveAttribute('href', 'https://github.com/dan33pro/gpscontrol');

    const backRepoLink = screen.getByText('Link repo back');
    expect(backRepoLink).toHaveAttribute('href', 'https://github.com/dan33pro/api-gps-control');
  });
});
