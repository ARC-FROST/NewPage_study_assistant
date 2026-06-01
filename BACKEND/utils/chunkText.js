function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let i = 0;

  while (i < text.length) {
    const end = i + chunkSize;
    const chunk = text.slice(i, end);
    chunks.push(chunk);
    i += chunkSize - overlap; // overlap helps context continuity
  }

  return chunks;
}

module.exports = chunkText;