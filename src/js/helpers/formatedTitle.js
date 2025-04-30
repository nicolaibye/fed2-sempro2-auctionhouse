export function formatedTitle(title) {
  const titleLength = title.length;
    const maxLength = 20;
    const ellipsis = "...";
    if (titleLength > maxLength) {
      return title.substring(0, maxLength - ellipsis.length) + ellipsis;
    }
    return title;
}