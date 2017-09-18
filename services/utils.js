export function convertToListItem(data) {
  const items = data.map(item => ({
    id: item.id,
    title: item.snippet.title,
    img: item.snippet.thumbnails ? item.snippet.thumbnails.default.url : undefined,
    videoId: item.snippet.resourceId ? item.snippet.resourceId.videoId : undefined
  }));

  return items;
}