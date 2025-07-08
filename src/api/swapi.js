const url = "https://swapi.tech/api/";

export const getCharacters = async () => {
  const firstResponse = await fetch(`${url}people?page=1&limit=10`);
  if (!firstResponse.ok) throw new Error("Error loading characters");
  const firstData = await firstResponse.json();
  const totalPages = firstData.total_pages || 1;
  const fetches = [];
  for (let page = 1; page <= totalPages; page++) {
    fetches.push(
      fetch(`${url}people?page=${page}&limit=10`).then((res) => res.json())
    );
  }
  const allData = await Promise.all(fetches);
  const all = allData.flatMap((data) => data.results || []);
  return all;
};

export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${url}people/${id}`);
    if (!response.ok) throw new Error("Error loading character detail");
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const getVehicles = async () => {
  const firstResponse = await fetch(`${url}vehicles?page=1&limit=10`);
  if (!firstResponse.ok) throw new Error("Error loading vehicles");
  const firstData = await firstResponse.json();
  const totalPages = firstData.total_pages || 1;
  const fetches = [];
  for (let page = 1; page <= totalPages; page++) {
    fetches.push(
      fetch(`${url}vehicles?page=${page}&limit=10`).then((res) => res.json())
    );
  }
  const allData = await Promise.all(fetches);
  const all = allData.flatMap((data) => data.results || []);
  return all;
};

export const getVehicleById = async (id) => {
  try {
    const response = await fetch(`${url}vehicles/${id}`);
    if (!response.ok) throw new Error("Error loading vehicle detail");
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const getPlanets = async () => {
  const firstResponse = await fetch(`${url}planets?page=1&limit=10`);
  if (!firstResponse.ok) throw new Error("Error loading planets");
  const firstData = await firstResponse.json();
  const totalPages = firstData.total_pages || 1;
  const fetches = [];
  for (let page = 1; page <= totalPages; page++) {
    fetches.push(
      fetch(`${url}planets?page=${page}&limit=10`).then((res) => res.json())
    );
  }
  const allData = await Promise.all(fetches);
  const all = allData.flatMap((data) => data.results || []);
  return all;
};

export const getPlanetById = async (id) => {
  try {
    const response = await fetch(`${url}planets/${id}`);
    if (!response.ok) throw new Error("Error loading planet detail");
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};
