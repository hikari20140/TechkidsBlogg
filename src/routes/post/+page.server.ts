import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		const title = data.get('title') as string;
		const category = data.get('category') as string;
		const author = data.get('author') as string;
		const content = data.get('content') as string;

		// バリデーション
		if (!title || !content || !category || !author) {
			return {
				error: '必須項目を入力してください。'
			};
		}

		try {
			// APIに投稿データを送信
			const response = await fetch('/api/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					category,
					author,
					content
				})
			});

			if (!response.ok) {
				throw new Error('投稿に失敗しました');
			}

			const result = await response.json();

			// 投稿成功後、投稿した記事のページにリダイレクト
			throw redirect(303, `/post/${result.post.id}`);
		} catch (error) {
			if (error instanceof Error && error.message.includes('redirect')) {
				throw error;
			}
			return {
				error: '投稿に失敗しました。もう一度お試しください。'
			};
		}
	}
};