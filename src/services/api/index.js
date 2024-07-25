const API = process.env.API_URL;
const VERSION = process.env.API_VERSION;

const endPoints = {
  interesteds: {
    getInterested: (id) => `${API}/api/${VERSION}/interesteds/${id}`,
    getInteresteds: `${API}/api/${VERSION}/interesteds/`,
    addInterested: `${API}/api/${VERSION}/interesteds/`,
    updateInterested: (id) => `${API}/api/${VERSION}/interesteds/${id}/`,
    deleteInterested: (id) => `${API}/api/${VERSION}/interesteds/${id}/`,
  },
};

export default endPoints;
