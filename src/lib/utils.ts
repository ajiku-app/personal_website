export function getReadingTime(body: string): number {
  const wordsPerMinute = 200;
  const wordCount = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / wordsPerMinute));
}

export function getSnippet(body: string, maxLength = 140): string {
  const plainText = body
    .replace(/^#+\s+.*$/gm, '')
    .replace(/[*_>`#]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}
