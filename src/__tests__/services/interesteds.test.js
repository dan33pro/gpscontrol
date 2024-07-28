import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import endPoints from '@services/api';
import { getInteresteds, getInterested, addInterested, updateInterested, deleteInterested } from '@services/api/interesteds';

describe('Interesteds API service', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('getInteresteds debería devolver datos y estado en caso de éxito', async () => {
    const data = [{ id: 1, name: 'Interested 1' }];
    mock.onGet(endPoints.interesteds.getInteresteds).reply(200, data);

    const response = await getInteresteds();
    expect(response).toEqual({ data, status: 200 });
  });

  it('getInteresteds debería devolver un error y un estado en caso de falla', async () => {
    mock.onGet(endPoints.interesteds.getInteresteds).reply(500);

    const response = await getInteresteds();
    expect(response).toEqual({
      error: expect.objectContaining({
        message: 'Request failed with status code 500',
        response: expect.objectContaining({
          status: 500,
        }),
      }),
      status: undefined,
    });
  });

  it('getInterested debería devolver datos y estado en caso de éxito', async () => {
    const data = { id: 1, name: 'Interested 1' };
    const id = 1;
    mock.onGet(endPoints.interesteds.getInterested(id)).reply(200, data);

    const response = await getInterested(id);
    expect(response).toEqual({ data, status: 200 });
  });

  it('getInterested debería devolver un error y un estado en caso de falla', async () => {
    const id = 1;
    mock.onGet(endPoints.interesteds.getInterested(id)).reply(500);

    const response = await getInterested(id);
    expect(response).toEqual({
      error: expect.objectContaining({
        message: 'Request failed with status code 500',
        response: expect.objectContaining({
          status: 500,
        }),
      }),
      status: undefined,
    });
  });

  it('addInterested debe devolver datos y estado en caso de éxito', async () => {
    const body = { name: 'Interested 1' };
    const data = { id: 1, ...body };
    mock.onPost(endPoints.interesteds.addInterested, body).reply(201, data);

    const response = await addInterested(body);
    expect(response).toEqual({ data, status: 201 });
  });

  it('addInterested debería devolver un error y un estado en caso de falla', async () => {
    const body = { name: 'Interested 1' };
    mock.onPost(endPoints.interesteds.addInterested, body).reply(500);

    const response = await addInterested(body);
    expect(response).toEqual({
      error: expect.objectContaining({
        message: 'Request failed with status code 500',
        response: expect.objectContaining({
          status: 500,
        }),
      }),
      status: undefined,
    });
  });

  it('updateInterested debería devolver datos y estado en caso de éxito', async () => {
    const id = 1;
    const body = { name: 'Updated Interested' };
    const data = { id, ...body };
    mock.onPatch(endPoints.interesteds.updateInterested(id), body).reply(200, data);

    const response = await updateInterested(id, body);
    expect(response).toEqual({ data, status: 200 });
  });

  it('updateInterested debería devolver un error y un estado en caso de falla', async () => {
    const id = 1;
    const body = { name: 'Updated Interested' };
    mock.onPatch(endPoints.interesteds.updateInterested(id), body).reply(500);

    const response = await updateInterested(id, body);
    expect(response).toEqual({
      error: expect.objectContaining({
        message: 'Request failed with status code 500',
        response: expect.objectContaining({
          status: 500,
        }),
      }),
      status: undefined,
    });
  });

  it('deleteInterested debe devolver datos y estado en caso de éxito', async () => {
    const id = 1;
    mock.onDelete(endPoints.interesteds.deleteInterested(id)).reply(200);

    const response = await deleteInterested(id);
    expect(response).toEqual({ data: undefined, status: 200 });
  });

  it('deleteInterested debería devolver un error y un estado en caso de falla', async () => {
    const id = 1;
    mock.onDelete(endPoints.interesteds.deleteInterested(id)).reply(500);

    const response = await deleteInterested(id);
    expect(response).toEqual({
      error: expect.objectContaining({
        message: 'Request failed with status code 500',
        response: expect.objectContaining({
          status: 500,
        }),
      }),
      status: undefined,
    });
  });
});
