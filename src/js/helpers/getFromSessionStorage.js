export function getFromSessionStorage(key) {
    const value = sessionStorage.getItem(key);
    if (value) {
        return value;
    }
    return null;
}