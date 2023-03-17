import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate); //conver the ISOString to a Date obj

  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); //how long has passed since the date (in milliseconds)

  return duration; //return how long has passed since the date (in milliseconds)
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  // If token doesn't exist
  if (!token) {
    return null; //undefined doesn't work here it must be null, (the loader won't return undefined to the components)
  }

  // If token expired
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED'; //the data the loader will return will be expired
  }

  // If token is exists & is not expired
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  // there always needs to be a return value inside a loader
  return null;
}
