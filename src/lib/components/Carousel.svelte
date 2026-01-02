<script>
	export let items = [];
	export let interval = 4000;
	let current = 0;
	let timer;
	let startX = 0;
	let deltaX = 0;
	function start() {
		stop();
		timer = setInterval(() => {
			current = (current + 1) % items.length;
		}, interval);
	}
	function stop() {
		if (timer) clearInterval(timer);
	}
	function onPointerDown(e) {
		stop();
		startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
		deltaX = 0;
	}
	function onPointerMove(e) {
		const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
		deltaX = x - startX;
	}
	function onPointerUp() {
		if (deltaX > 60) {
			current = (current - 1 + items.length) % items.length;
		} else if (deltaX < -60) {
			current = (current + 1) % items.length;
		}
		start();
	}
	$: items?.length && !timer && start();
</script>

<div class="relative">
	<div
		class="overflow-hidden"
		on:pointerdown={onPointerDown}
		on:pointermove={onPointerMove}
		on:pointerup={onPointerUp}
		on:touchstart={onPointerDown}
		on:touchmove={onPointerMove}
		on:touchend={onPointerUp}
	>
		<div class="flex transition-transform duration-500 ease-out" style={`transform: translateX(-${current * 100}%)`}>
			{#each items as item}
				<div class="min-w-full px-4 sm:px-6 lg:px-8">
					<div class="mx-auto max-w-3xl rounded-xl ring-1 ring-neutral-200 bg-white p-6 sm:p-8 border-t border-b border-neutral-200">
						<div class="text-neutral-900 text-lg">{item.quote}</div>
						<div class="mt-4 flex items-center gap-3">
							{#if item.avatar}
								<img src={item.avatar} alt="" class="h-9 w-9 rounded-full object-cover" />
							{/if}
							<div>
								<div class="text-sm font-medium text-neutral-900">{item.author}</div>
								<div class="text-xs text-neutral-600">{item.role}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="absolute inset-x-0 -bottom-8 flex items-center justify-center gap-2">
		{#each items as _, i}
			<button
				class="h-2.5 w-2.5 rounded-full ring-1 ring-neutral-300"
				class:opacity-100={current === i}
				class:opacity-50={current !== i}
				on:click={() => (current = i)}
				aria-label="Go to slide"
			/>
		{/each}
	</div>
	<div class="mt-6 flex justify-center gap-4">
		<button
			class="inline-flex items-center rounded-md ring-1 ring-neutral-300 px-3 py-2 text-sm"
			on:click={() => (current = (current - 1 + items.length) % items.length)}
		>
			Sebelumnya
		</button>
		<button
			class="inline-flex items-center rounded-md ring-1 ring-neutral-300 px-3 py-2 text-sm"
			on:click={() => (current = (current + 1) % items.length)}
		>
			Selanjutnya
		</button>
	</div>
</div>
