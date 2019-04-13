export default function compactTags(tags: string[]) {
  const lookup: any = {};

  return tags.reduce((newTags, tag) => {
    if (lookup[tag]) {
      return newTags;
    }

    lookup[tag] = true;
    newTags.push(tag);

    return newTags;
  }, [] as string[]);
}
