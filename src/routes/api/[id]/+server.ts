import { json } from "@sveltejs/kit";

var posts: Array<{ id: number; title: string; content: string; author: string }> = [
    {id: 1, title: "Test Post", content: "# test post", author: "Five"}
];
export async function GET({ params }) {
	const { id } = params;

	// Fetch the blog post data from your data source
	const post = posts.find(post => post.id === parseInt(id));

	return json(post);
}

export async function POST({request, cookies}) {
	const data = await request.json();
	
	const newPost = {
		id: posts.length + 1,
		title: data.title,
		content: data.content,
		author: data.author
	};
	posts.push(newPost);
	return json({ success: true, post: newPost });
}