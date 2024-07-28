import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MainSection from '@layouts/MainSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock('@logos/Imagologotipo_motion.svg', () => 'mocked-image');
jest.mock('@containers/FormCard', () => () => <div>Mocked FormCard</div>);
jest.mock('@components/SimpleTable', () => () => <div>Mocked SimpleTable</div>);

describe('MainSection', () => {
  it('Representa el componente FormCard', () => {
    render(<MainSection />);
    const formCard = screen.getByText('Mocked FormCard');
    expect(formCard).toBeInTheDocument();
  });

  it('Representa el componente SimpleTable', () => {
    render(<MainSection />);
    const simpleTable = screen.getByText('Mocked SimpleTable');
    expect(simpleTable).toBeInTheDocument();
  });

  it('Representa el logotipo grande', () => {
    render(<MainSection />);
    const logo = screen.getByAltText('Large Motion Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mocked-image');
  });
});