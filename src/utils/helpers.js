export const noob = () => {}

export const generateUID = () => '_' + Math.random().toString(36).substring(7)

export const isNull = obj => obj == null  // check null or undefined

export const isBlank = obj => obj == null || obj.trim() === '' // check null or empty string

export const isCallback = callback => !isNull(callback) && callback instanceof Function

export const isEmpty = obj => {
  // null and undefined are 'empty'
  if (isNull(obj)) return true;

  // assume if it has a length property with a non-zero value
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // otherwise, does it have any properties of its own?
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }

  return true;
}

export const isValidEmail = str => {
  // eslint-disable-next-line
  let pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return pattern.test(String(str).toLowerCase());
}
