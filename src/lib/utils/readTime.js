const WORDS_PER_MINUTE = 200;

/**
 * Strip HTML tags and count words for read-time estimation.
 * @param {string} html
 * @returns {string} e.g. "4 min read"
 */
export function estimateReadTime(html) {
	if (!html) return '1 min read';
	const text = html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&[a-z]+;/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	const words = text ? text.split(' ').length : 0;
	const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
	return `${minutes} min read`;
}
