export function reveal(node, options = {}) {
	const { delay = 0, duration = 700, y = 24, threshold = 0.15 } = options;

	if (typeof IntersectionObserver === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

	function cleanup() {
		node.style.removeProperty('opacity');
		node.style.removeProperty('transform');
		node.style.removeProperty('transition');
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.unobserve(node);
				node.addEventListener('transitionend', cleanup, { once: true });
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
