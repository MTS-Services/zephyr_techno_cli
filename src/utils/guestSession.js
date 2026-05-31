export function getOrCreateGuestSessionId() {
  let sessionId = localStorage.getItem('guestSessionId');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('guestSessionId', sessionId);
  }
  return sessionId;
}

export function clearGuestSessionId() {
  localStorage.removeItem('guestSessionId');
}
