// BASIC SIMILARITY: compares common words between user message and training question

module.exports = function textSimilarity(input, target) {
  if (!input || !target) return 0;

  // Convert to lowercase
  input = input.toLowerCase();
  target = target.toLowerCase();

  // Split into words
  const inputWords = input.split(" ");
  const targetWords = target.split(" ");

  let matches = 0;

  inputWords.forEach((word) => {
    if (targetWords.includes(word)) {
      matches++;
    }
  });

  const score = matches / Math.max(targetWords.length, 1);

  return score; // 0 to 1
};
