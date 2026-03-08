import type { PageLoad } from "./$types";
import { marked } from "marked";

export const load: PageLoad = async ({ params, fetch }) => {
	const { postid } = params;

	// Fetch the blog post data based on the postid
	let post = await fetch(`/api/${postid}`).then(res => res.json());
	if (!post) return { post: undefined };
	post = {
		...post,
		content: marked(post.content)
	};
	return {
		post
	};
};