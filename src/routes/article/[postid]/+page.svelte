<script lang="ts">
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { error } from '@sveltejs/kit';

export let data: { post?: any };

const post = data?.post;
</script>

{#if !post}
  <div class="not-found">
    <h2>記事が見つかりません</h2>
    <p>指定された記事IDの投稿は存在しません。</p>
    <a href="/">ホームに戻る</a>
  </div>
{:else}
  <article class="post-detail">
    <div class="post-header">
      {#if post.image}
        <img class="post-image" src={post.image} alt={post.title} />
      {/if}
      {#if post.category}
        <span class="category-badge">{post.category}</span>
      {/if}
    </div>
    <div class="post-body">
      <h1 class="post-title">{post.title}</h1>
      <div class="post-meta">
        {#if post.author}
          <span class="author">✍️ {post.author}</span>
        {/if}
        {#if post.readTime}
          <span class="read-time">📖 {post.readTime}</span>
        {/if}
        {#if post.date}
          <span class="date">{post.date}</span>
        {/if}
      </div>
      {#if post.excerpt}
        <p class="post-excerpt">{post.excerpt}</p>
      {/if}
      <div class="post-content" >{@html post.content}</div>
    </div>
  </article>
{/if}

<style>
.post-detail {
  max-width: 800px;
  margin: 60px auto 40px auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  animation: fadeIn 0.7s ease;
}
.post-header {
  position: relative;
}
.post-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}
.category-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102,126,234,0.2);
}
.post-body {
  padding: 40px 32px;
}
.post-title {
  font-size: 32px;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.post-meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;
}
.post-excerpt {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}
.post-content {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
}
.not-found {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 40px 32px;
}
.not-found h2 {
  color: #764ba2;
  margin-bottom: 16px;
}
.not-found a {
  display: inline-block;
  margin-top: 24px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid #667eea;
  transition: color 0.2s;
}
.not-found a:hover {
  color: #764ba2;
}
@media (max-width: 600px) {
  .post-detail {
    margin: 30px 0;
    border-radius: 0;
  }
  .post-body {
    padding: 24px 12px;
  }
  .post-title {
    font-size: 22px;
  }
  .post-image {
    height: 180px;
  }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
