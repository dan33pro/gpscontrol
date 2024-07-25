import axios from 'axios';
import endPoints from '@services/api';

const getInteresteds = async () => {
  let response;
  try {
    response = await axios.get(endPoints.interesteds.getInteresteds);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return { error: error, status: response?.status };
  }
};

const getInterested = async (id) => {
  let response;
  try {
    response = await axios.get(endPoints.interesteds.getInterested(id));
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return { error: error, status: response?.status };
  }
};

const addInterested = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  let response;
  try {
    const response = await axios.post(endPoints.interesteds.addInterested, body, config);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return { error: error, status: response?.status };
  }
};

const updateInterested = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  let response;
  try {
    const response = await axios.patch(endPoints.interesteds.updateInterested(id), body, config);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return { error: error, status: response?.status };
  }
};

const deleteInterested = async (id) => {
  let response;
  try {
    const response = await axios.delete(endPoints.interesteds.deleteInterested(id));
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('No se pudo eliminar el registro');
    return { error: error, status: response?.status };
  }
};

export { getInteresteds, getInterested, addInterested, updateInterested, deleteInterested };
