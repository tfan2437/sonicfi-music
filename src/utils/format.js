// All Formating Function

export const formatPlayCount = (count) => {
  const number = Number(count);
  return new Intl.NumberFormat().format(number);
};

export const formatMinutesAndSeconds = (totalMilliseconds) => {
  if (!totalMilliseconds) return "0:00";

  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatArtistsName = (artists) => {
  return artists.map((artist) => artist.name).join(", ");
};

export const formatBioText = (bioText) => {
  if (bioText === null) return;

  const characterMap = {
    "&#34;": '"',
    "&#39;": "'",
    "&amp;": "&",
  };

  let cleanedText = bioText;
  for (const [charCode, char] of Object.entries(characterMap)) {
    const regex = new RegExp(charCode, "g");
    cleanedText = cleanedText.replace(regex, char);
  }

  // Format the text with proper punctuation and line breaks
  cleanedText = cleanedText.replace(/(?:\r\n|\r|\n)/g, " "); // Remove any existing line breaks
  cleanedText = cleanedText.replace(/(?<=\.|,|;|\?|\!)\s+/g, " "); // Ensure single spaces after punctuation
  cleanedText = cleanedText.replace(/\s*([.?!])\s*/g, "$1 "); // Ensure single space after punctuation
  cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
  cleanedText = cleanedText.replace(/<a[^>]*>([^<]*)<\/a>/g, "$1"); // Replace <a> tag
  cleanedText = cleanedText.trim(); // Remove any leading or trailing whitespace

  return cleanedText;
};

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// filter
export const filterSearchResult = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const filteredAlbums = data.albums.items.slice(0, 10).map((album) => ({
        id: album.data.uri.slice(14, 36),
        name: album.data.name,
        images: album.data.coverArt.sources[0].url,
        artists: album.data.artists.items.map((artist) => ({
          id: artist.uri.slice(15, 37),
          name: artist.profile.name,
        })),
      }));

      const filteredArtists = data.artists.items.slice(0, 10).map((artist) => ({
        id: artist.data.uri.slice(15, 37),
        name: artist.data.profile.name,
        images: artist.data.visuals?.avatarImage?.sources[0]?.url || "",
      }));

      const filteredTracks = data.tracks.items.slice(0, 20).map((track) => ({
        album: {
          id: track.data.albumOfTrack.id,
          name: track.data.albumOfTrack.name,
          images: [
            {
              url: track.data.albumOfTrack.coverArt.sources[0].url,
            },
          ],
        },
        artists: [
          {
            id: track.data.artists.items[0].uri.slice(15, 37),
            name: track.data.artists.items[0].profile.name,
          },
        ],
        duration_ms: track.data.duration.totalMilliseconds,
        id: track.data.id,
        name: track.data.name,
        popularity: 0,
        preview_url: "",
      }));

      const result = {
        albums: {
          items: filteredAlbums,
        },
        artists: {
          items: filteredArtists,
        },
        tracks: {
          items: filteredTracks,
        },
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
