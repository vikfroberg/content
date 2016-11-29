export const post = (pattern, handler) => {
  return {
    method: 'POST',
    pattern,
    handler,
  }
}

export const get = (pattern, handler) => {
  return {
    method: 'GET',
    pattern,
    handler,
  }
}
