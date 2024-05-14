import axios from "axios";

const getData = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error);
  }
};

export default getData;
