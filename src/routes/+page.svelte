<script lang="ts">
	import { onMount } from 'svelte';

	interface BlogPost {
		id: number;
		title: string;
		excerpt: string;
		category: string;
		date: string;
		author: string;
		readTime: string;
		image: string;
	}

	let posts: BlogPost[] = [
		
	];

	let selectedCategory = 'すべて';
	let filteredPosts: BlogPost[] = [];
	let scrollProgress = 0;

	const categories = ['すべて', 'フロントエンド', 'バックエンド', 'データベース', 'インフラ'];

	function filterPosts(category: string) {
		selectedCategory = category;
		if (category === 'すべて') {
			filteredPosts = posts;
		} else {
			filteredPosts = posts.filter(post => post.category === category);
		}
	}

	function handleScroll() {
		const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = (window.scrollY / totalHeight) * 100;
		scrollProgress = scrolled;
	}

	onMount(() => {
		filteredPosts = posts;
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function formatDate(dateString: string): string {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('ja-JP', options);
	}
</script>

<svelte:window on:scroll={handleScroll} />

<div class="scroll-progress-bar" style="width: {scrollProgress}%"></div>

<!-- ナビゲーションバー -->
<header class="navbar">
	<div class="navbar-container">
		<div class="logo">
			<span class="logo-icon">💻</span>
			<h1>Techkids Blog</h1>
		</div>
		<nav class="nav-links">
			<a href="#home">ホーム</a>
			<a href="#posts">記事</a>
			<a href="#about">について</a>
			<a href="#contact">お問い合わせ</a>
		</nav>
	</div>
</header>

<!-- ヒーローセクション -->
<section class="hero">
	<div class="hero-content">
		<h2 class="hero-title">技術知識を共有しよう</h2>
		<p class="hero-subtitle">最新のWeb開発、プログラミング、テクノロジーについて学べるブログ</p>
		<button class="cta-button">記事を読み始める</button>
	</div>
	<div class="hero-illustration">
		<div class="floating-card card-1">HTML</div>
		<div class="floating-card card-2">CSS</div>
		<div class="floating-card card-3">JavaScript</div>
	</div>
</section>

<!-- フィルターセクション -->
<section class="filter-section">
	<div class="container">
		<h2 class="section-title">カテゴリーで検索</h2>
		<div class="category-filters">
			{#each categories as category}
				<button
					class="filter-btn {selectedCategory === category ? 'active' : ''}"
					on:click={() => filterPosts(category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- ブログポストセクション -->
<section class="posts-section">
	<div class="container">
		<div class="posts-grid">
			{#each filteredPosts as post (post.id)}
				<article class="post-card">
					<div class="post-image">
						<img src={post.image} alt={post.title} />
						<span class="category-badge">{post.category}</span>
					</div>
					<div class="post-content">
						<h3 class="post-title">{post.title}</h3>
						<p class="post-excerpt">{post.excerpt}</p>
						<div class="post-meta">
							<div class="meta-left">
								<span class="author">✍️ {post.author}</span>
								<span class="read-time">📖 {post.readTime}</span>
							</div>
							<span class="date">{formatDate(post.date)}</span>
						</div>
						<button class="read-more-btn">続きを読む →</button>
					</div>
				</article>
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<div class="no-posts">
				<p>このカテゴリーの記事はまだありません。</p>
			</div>
		{/if}
	</div>
</section>

<!-- ニュースレターセクション -->
<section class="newsletter-section">
	<div class="container">
		<div class="newsletter-content">
			<h2>最新の記事をメールで受け取ろう</h2>
			<p>週に1回、最新のテクノロジー記事をあなたのメールボックスにお届けします。</p>
			<div class="newsletter-form">
				<input type="email" placeholder="あなたのメールアドレス" />
				<button class="subscribe-btn">購読する</button>
			</div>
		</div>
	</div>
</section>

<!-- フッター -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-section">
				<h4>Techkids Blog</h4>
				<p>技術情報を共有し、学び、成長するためのコミュニティです。</p>
			</div>
			<div class="footer-section">
				<h4>クイックリンク</h4>
				<ul>
					<li><a href="#posts">ブログ記事</a></li>
					<li><a href="#about">プロフィール</a></li>
					<li><a href="#contact">お問い合わせ</a></li>
				</ul>
			</div>
			<div class="footer-section">
				<h4>フォロー</h4>
				<div class="social-links">
					<a href="#twitter">Twitter</a>
					<a href="#github">GitHub</a>
					<a href="#linkedin">LinkedIn</a>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2026 Techkids Blog. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		color: #333;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.scroll-progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		z-index: 1000;
		transition: width 0.1s ease-out;
	}

	/* ナビゲーションバー */
	.navbar {
		position: sticky;
		top: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.logo:hover {
		transform: scale(1.05);
	}

	.logo-icon {
		font-size: 32px;
	}

	.logo h1 {
		margin: 0;
		font-size: 24px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.nav-links {
		display: flex;
		gap: 30px;
	}

	.nav-links a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
		position: relative;
		transition: color 0.3s ease;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		bottom: -5px;
		left: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		transition: width 0.3s ease;
	}

	.nav-links a:hover {
		color: #667eea;
	}

	.nav-links a:hover::after {
		width: 100%;
	}

	/* ヒーローセクション */
	.hero {
		max-width: 1200px;
		margin: 0 auto;
		padding: 80px 20px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 50px;
	}

	.hero-content {
		animation: fadeInUp 0.8s ease-out;
	}

	.hero-title {
		font-size: 48px;
		font-weight: 700;
		margin: 0 0 20px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 18px;
		color: #666;
		margin: 0 0 30px 0;
		line-height: 1.6;
	}

	.cta-button {
		padding: 15px 40px;
		font-size: 16px;
		font-weight: 600;
		border: none;
		border-radius: 50px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
	}

	.cta-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
	}

	.hero-illustration {
		position: relative;
		height: 400px;
		animation: fadeInDown 0.8s ease-out;
	}

	.floating-card {
		position: absolute;
		padding: 20px 30px;
		background: white;
		border-radius: 15px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		font-weight: 600;
		font-size: 18px;
		animation: float 3s ease-in-out infinite;
	}

	.card-1 {
		top: 50px;
		left: 50px;
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
		animation-delay: 0s;
	}

	.card-2 {
		top: 150px;
		right: 50px;
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		color: white;
		animation-delay: 0.5s;
	}

	.card-3 {
		bottom: 50px;
		left: 100px;
		background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
		color: white;
		animation-delay: 1s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* フィルターセクション */
	.filter-section {
		background: white;
		padding: 40px 20px;
		margin: 40px 0;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		text-align: center;
		font-size: 28px;
		margin: 0 0 30px 0;
		color: #333;
	}

	.category-filters {
		display: flex;
		justify-content: center;
		gap: 15px;
		flex-wrap: wrap;
	}

	.filter-btn {
		padding: 10px 20px;
		border: 2px solid #e0e0e0;
		background: white;
		border-radius: 25px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s ease;
		color: #666;
	}

	.filter-btn:hover {
		border-color: #667eea;
		color: #667eea;
	}

	.filter-btn.active {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-color: transparent;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}

	/* ポストセクション */
	.posts-section {
		padding: 60px 20px;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 30px;
	}

	.post-card {
		background: white;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		cursor: pointer;
		animation: slideUp 0.6s ease-out;
	}

	.post-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.post-image {
		position: relative;
		overflow: hidden;
		height: 200px;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.post-card:hover .post-image img {
		transform: scale(1.1);
	}

	.category-badge {
		position: absolute;
		top: 15px;
		right: 15px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 5px 15px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
	}

	.post-content {
		padding: 25px;
	}

	.post-title {
		font-size: 20px;
		margin: 0 0 15px 0;
		color: #333;
		line-height: 1.4;
	}

	.post-excerpt {
		color: #666;
		font-size: 14px;
		line-height: 1.6;
		margin: 0 0 15px 0;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 15px 0;
		font-size: 12px;
		color: #999;
		padding-bottom: 15px;
		border-bottom: 1px solid #eee;
	}

	.meta-left {
		display: flex;
		gap: 20px;
	}

	.author,
	.read-time,
	.date {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.read-more-btn {
		width: 100%;
		padding: 12px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		font-size: 14px;
		transition: opacity 0.3s ease;
	}

	.read-more-btn:hover {
		opacity: 0.9;
	}

	.no-posts {
		text-align: center;
		padding: 60px 20px;
		color: #999;
		font-size: 18px;
	}

	/* ニュースレターセクション */
	.newsletter-section {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 60px 20px;
		margin: 40px 0;
	}

	.newsletter-content {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		color: white;
	}

	.newsletter-content h2 {
		margin: 0 0 15px 0;
		font-size: 32px;
	}

	.newsletter-content p {
		margin: 0 0 30px 0;
		font-size: 16px;
		opacity: 0.9;
	}

	.newsletter-form {
		display: flex;
		gap: 10px;
	}

	.newsletter-form input {
		flex: 1;
		padding: 15px 20px;
		border: none;
		border-radius: 50px;
		font-size: 14px;
		outline: none;
	}

	.subscribe-btn {
		padding: 15px 40px;
		background: white;
		color: #667eea;
		border: none;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.subscribe-btn:hover {
		transform: scale(1.05);
	}

	/* フッター */
	.footer {
		background: #1a1a1a;
		color: white;
		padding: 60px 20px 20px;
		margin-top: 80px;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 40px;
		margin-bottom: 40px;
	}

	.footer-section h4 {
		margin: 0 0 15px 0;
		font-size: 18px;
	}

	.footer-section p {
		margin: 0;
		color: #aaa;
		line-height: 1.6;
		font-size: 14px;
	}

	.footer-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer-section li {
		margin-bottom: 10px;
	}

	.footer-section a {
		color: #aaa;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.footer-section a:hover {
		color: #667eea;
	}

	.social-links {
		display: flex;
		gap: 15px;
	}

	.footer-bottom {
		text-align: center;
		padding-top: 20px;
		border-top: 1px solid #333;
		color: #666;
		font-size: 14px;
	}

	/* レスポンシブデザイン */
	@media (max-width: 768px) {
		.hero {
			grid-template-columns: 1fr;
			padding: 40px 20px;
		}

		.hero-title {
			font-size: 36px;
		}

		.hero-subtitle {
			font-size: 16px;
		}

		.nav-links {
			gap: 15px;
			font-size: 14px;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}

		.newsletter-form {
			flex-direction: column;
		}

		.newsletter-form input,
		.subscribe-btn {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.navbar-container {
			flex-direction: column;
			gap: 15px;
			height: auto;
			padding: 15px 20px;
		}

		.nav-links {
			width: 100%;
			justify-content: space-around;
			gap: 10px;
		}

		.logo h1 {
			font-size: 20px;
		}

		.hero-title {
			font-size: 28px;
		}

		.category-filters {
			gap: 10px;
		}

		.filter-btn {
			padding: 8px 15px;
			font-size: 12px;
		}
	}
</style>
