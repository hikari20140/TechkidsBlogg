<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form: any;
</script>

<svelte:head>
	<title>記事を投稿 - Techkids Blog</title>
</svelte:head>

<div class="container">
	<header class="header">
		<h1>記事を投稿</h1>
		<p>新しい技術記事を共有しましょう</p>
	</header>

	{#if form?.error}
		<div class="error-message">
			{form.error}
		</div>
	{/if}

	{#if form?.success}
		<div class="success-message">
			記事が正常に投稿されました！
		</div>
	{/if}

	<form method="POST" action="/api" use:enhance class="post-form">
		<div class="form-group">
			<label for="title">タイトル <span class="required">*</span></label>
			<input
				type="text"
				id="title"
				name="title"
				required
				placeholder="記事のタイトルを入力してください"
				value={form?.title || ''}
			/>
		</div>

		<div class="form-group">
			<label for="excerpt">概要</label>
			<textarea
				id="excerpt"
				name="excerpt"
				rows="3"
				placeholder="記事の概要を簡潔に書いてください"
				value={form?.excerpt || ''}
			></textarea>
		</div>

		<div class="form-group">
			<label for="author">著者名 <span class="required">*</span></label>
			<input
				type="text"
				id="author"
				name="author"
				required
				placeholder="あなたの名前"
				value={form?.author || ''}
			/>
		</div>

		<div class="form-group">
			<label for="content">本文 <span class="required">*</span></label>
			<textarea
				id="content"
				name="content"
				rows="15"
				required
				placeholder="Markdown形式で記事を書いてください"
				value={form?.content || ''}
			></textarea>
			<small class="help-text">Markdown形式で記述できます。見出し、リスト、リンクなどが使用可能です。</small>
		</div>

		<div class="form-actions">
			<button type="submit" class="submit-btn">投稿する</button>
			<a href="/" class="cancel-btn">キャンセル</a>
		</div>
	</form>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	.header {
		text-align: center;
		margin-bottom: 40px;
	}

	.header h1 {
		font-size: 32px;
		margin: 0 0 10px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.header p {
		color: #666;
		font-size: 16px;
		margin: 0;
	}

	.error-message {
		background: #fee;
		color: #c33;
		padding: 15px;
		border-radius: 8px;
		border-left: 4px solid #c33;
		margin-bottom: 20px;
	}

	.success-message {
		background: #efe;
		color: #363;
		padding: 15px;
		border-radius: 8px;
		border-left: 4px solid #363;
		margin-bottom: 20px;
	}

	.post-form {
		background: white;
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.08);
	}

	.form-group {
		margin-bottom: 25px;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		margin-bottom: 25px;
	}

	.form-group label {
		display: block;
		margin-bottom: 8px;
		font-weight: 600;
		color: #333;
	}

	.required {
		color: #e74c3c;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		font-size: 14px;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.form-group textarea {
		resize: vertical;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		line-height: 1.5;
	}

	.help-text {
		display: block;
		margin-top: 5px;
		color: #666;
		font-size: 12px;
	}

	.form-actions {
		display: flex;
		gap: 15px;
		justify-content: center;
		margin-top: 40px;
	}

	.submit-btn {
		padding: 15px 40px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.submit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
	}

	.cancel-btn {
		padding: 15px 40px;
		background: white;
		color: #666;
		border: 2px solid #e0e0e0;
		border-radius: 50px;
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.cancel-btn:hover {
		border-color: #667eea;
		color: #667eea;
	}

	@media (max-width: 600px) {
		.container {
			padding: 20px 15px;
		}

		.post-form {
			padding: 20px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column;
		}

		.submit-btn,
		.cancel-btn {
			width: 100%;
			text-align: center;
		}
	}
</style>