<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let { content = '', onchange = () => {} } = $props();

	let editorElement;
	let editor = $state(null);
	let mounted = $state(false);

	onMount(async () => {
		if (!browser) return;

		const { Editor } = await import('@tiptap/core');
		const { default: StarterKit } = await import('@tiptap/starter-kit');
		const { default: Image } = await import('@tiptap/extension-image');
		const { default: Placeholder } = await import('@tiptap/extension-placeholder');

		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({ link: { openOnClick: false } }),
				Image.configure({ inline: true }),
				Placeholder.configure({ placeholder: 'Tulis konten artikel di sini...' })
			],
			content: content,
			onUpdate: ({ editor: e }) => {
				onchange(e.getHTML());
			}
		});
		mounted = true;
	});

	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

<div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
	{#if mounted && editor}
		<div class="flex flex-wrap items-center gap-0.5 border-b border-slate-100 px-2 py-1.5">
			<button type="button" onclick={() => editor.chain().focus().toggleBold().run()} class="rounded px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('bold')}>B</button>
			<button type="button" onclick={() => editor.chain().focus().toggleItalic().run()} class="rounded px-2 py-1 text-xs italic text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('italic')}>I</button>
			<span class="mx-1 h-4 w-px bg-slate-200"></span>
			<button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} class="rounded px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('heading', { level: 2 })}>H2</button>
			<button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} class="rounded px-2 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('heading', { level: 3 })}>H3</button>
			<span class="mx-1 h-4 w-px bg-slate-200"></span>
			<button type="button" onclick={() => editor.chain().focus().toggleBulletList().run()} class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('bulletList')}>&bull; List</button>
			<button type="button" onclick={() => editor.chain().focus().toggleOrderedList().run()} class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('orderedList')}>1. List</button>
			<button type="button" onclick={() => editor.chain().focus().toggleBlockquote().run()} class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('blockquote')}>" Quote</button>
			<span class="mx-1 h-4 w-px bg-slate-200"></span>
			<button type="button" onclick={() => { const url = window.prompt('URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }} class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700" class:bg-slate-100={editor.isActive('link')}>Link</button>
			<button type="button" onclick={() => { const url = window.prompt('Image URL:'); if (url) editor.chain().focus().setImage({ src: url }).run(); }} class="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">Image</button>
		</div>
	{/if}
	<div bind:this={editorElement} class="prose prose-sm max-w-none p-4 focus:outline-none min-h-[300px]"></div>
</div>

<style>
	:global(.tiptap p.is-editor-empty:first-child::before) {
		color: #94a3b8;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	:global(.tiptap .ProseMirror-focused) {
		outline: none;
	}
</style>
