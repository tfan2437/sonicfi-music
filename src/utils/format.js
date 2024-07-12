// All Formating Function

export const formatPlayCount = (count) => {
  const number = Number(count);
  return new Intl.NumberFormat().format(number);
};

export const formatMinutesAndSeconds = (totalMilliseconds) => {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatArtistsName = (artists) => {
  return artists.map((artist) => artist.name).join(", ");
};
