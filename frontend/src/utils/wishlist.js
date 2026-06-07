const WISHLIST_KEY = 'komong_wishlist';

export function getWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function isInWishlist(destinationId) {
  return getWishlist().includes(destinationId);
}

export function addToWishlist(destinationId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(destinationId)) {
    wishlist.push(destinationId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
  }
}

export function removeFromWishlist(destinationId) {
  const wishlist = getWishlist().filter((id) => id !== destinationId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new Event('wishlist-updated'));
}

export function toggleWishlist(destinationId) {
  if (isInWishlist(destinationId)) {
    removeFromWishlist(destinationId);
    return false;
  } else {
    addToWishlist(destinationId);
    return true;
  }
}

export function clearWishlist() {
  localStorage.removeItem(WISHLIST_KEY);
  window.dispatchEvent(new Event('wishlist-updated'));
}
