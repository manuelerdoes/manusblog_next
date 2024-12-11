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

export function boolStringToInt(string) {
  let result = null;
  if (string === "true") {
    result = 1;
  } else {
    result = 0;
  }
  return result;
}

export function intToBool(int) {
  let result = null;
  if (int === 1) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
