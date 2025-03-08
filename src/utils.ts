export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Return in `hh:mm` format
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const convertMetersToKm = (meters: number): string => {
  const kilometers = meters / 1000;
  return `${kilometers.toFixed(2)} km`; // Return with two decimal points
};

export const calculateSpeed = (distance: number, time: number): string => {
  // Convert distance to kilometers and time to hours
  const speed = distance / 1000 / (time / 3600); // Speed in km/h
  return `${speed.toFixed(2)} km/h`; // Round the speed to 2 decimal places
};

export const formatNumberWithCommas = (num: number): string => {
  return `${num.toLocaleString()} m`; // Adds comma separators for thousands
};
