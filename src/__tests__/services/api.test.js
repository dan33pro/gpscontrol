import endPoints from '@services/api';

describe('API Endpoints', () => {
  const API = process.env.API_URL;
  const VERSION = process.env.API_VERSION;

  test('Debería construir la URL correcta para getInterested', () => {
    const id = '123';
    const expectedUrl = `${API}/api/${VERSION}/interesteds/${id}`;
    expect(endPoints.interesteds.getInterested(id)).toBe(expectedUrl);
  });

  test('Debería construir la URL correcta para getInteresteds', () => {
    const expectedUrl = `${API}/api/${VERSION}/interesteds/`;
    expect(endPoints.interesteds.getInteresteds).toBe(expectedUrl);
  });

  test('Debería construir la URL correcta para addInterested', () => {
    const expectedUrl = `${API}/api/${VERSION}/interesteds/`;
    expect(endPoints.interesteds.addInterested).toBe(expectedUrl);
  });

  test('Debería construir la URL correcta para updateInterested', () => {
    const id = '123';
    const expectedUrl = `${API}/api/${VERSION}/interesteds/${id}/`;
    expect(endPoints.interesteds.updateInterested(id)).toBe(expectedUrl);
  });

  test('Debería construir la URL correcta para deleteInterested', () => {
    const id = '123';
    const expectedUrl = `${API}/api/${VERSION}/interesteds/${id}/`;
    expect(endPoints.interesteds.deleteInterested(id)).toBe(expectedUrl);
  });
});
