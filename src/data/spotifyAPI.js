export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export const getTracksById = async (id) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Could not fetch the track data.");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const searchByKeyword = async (keyword) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${keyword}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
      options
    );
    if (!response.ok) {
      throw new Error("Could not fetch the track data.");
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const getArtistOverviewById = async (id) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Could not fetch the track data.");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
