export function getFormattedDateTime() {
  const now = new Date();

  // Add leading zero to day, month, hour, minute, and second if needed
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so +1
  const year = now.getFullYear();

  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');

  return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
}