export function extractContentWithKeywords(
  keywords: string[],
  content: string
) {
  // Check if the keywords array or content string is empty
  if (keywords.length === 0 || content.trim() === "") {
    return content.split(/\s+/).slice(0, 70).join(" ");
  }

  // Split the content into an array of words
  const words = content.split(/\s+/);

  // Find the index of the first appearance of any keyword
  let startIdx = -1;
  let keywordIdx = -1;

  for (const keyword of keywords) {
    const keywordIndex = words.findIndex((word) =>
      word.toLowerCase().includes(keyword.toLowerCase())
    );
    if (keywordIndex !== -1 && (startIdx === -1 || keywordIndex < startIdx)) {
      startIdx = keywordIndex - 35; // Extract 35 words before the first keyword
      keywordIdx = keywordIndex;
    }
  }

  // Handle the case where no keywords are found
  if (startIdx === -1 || words.length <= 70) {
    return content;
  }

  // Find the ending index for the extracted content
  let endIdx = startIdx + 70;

  // Handle edge cases where the extracted content might go out of bounds
  if (startIdx < 0) {
    startIdx = 0;
  }
  if (endIdx > words.length) {
    endIdx = words.length;
  }

  // Adjust startIdx if the keyword is close to the beginning of the content
  if (keywordIdx <= 35) {
    startIdx = 0;
    endIdx = 70;
  }

  // Adjust endIdx if the keyword is close to the end of the content
  if (keywordIdx >= words.length - 35) {
    startIdx = words.length - 70;
    endIdx = words.length;
  }

  // Return the extracted content
  const extractedContent = words.slice(startIdx, endIdx).join(" ");
  return extractedContent;
}
