export const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

// `https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=${id}&seed_artists=${id}&seed_genres=${id}`;

export const trackRecommendationsByGenres = async () => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=3SdFuYwyWoq7kuaHdTDcyD&seed_artists=0Y5tJX1MQlPlqiwlOH1tJY&seed_genres=hip-pop`,
      options
    );
    // 0Y5tJX1MQlPlqiwlOH1tJY
    // 3SdFuYwyWoq7kuaHdTDcyD
    // classical%2Ccountry
    if (!response.ok) {
      throw new Error("Could not fetch the track data.");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  // const url =
  //   "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "abdf33500fmsh9240dbab3ce6dddp14fee7jsn6cc1a251458b",
  //     "x-rapidapi-host": "spotify23.p.rapidapi.com",
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.text();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }
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

export const getAlbumById = async (id) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/albums/?ids=${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Could not fetch the album data.");
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const getAlbumMetaDataById = async (id) => {
  try {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/album_metadata/?id=${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Could not fetch the album data.");
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
