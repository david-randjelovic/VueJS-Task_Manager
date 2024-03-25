export const trimText = (text, length = 10) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}