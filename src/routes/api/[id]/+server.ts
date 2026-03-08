import { json } from "@sveltejs/kit";

var posts: Array<{ id: number; title: string; content: string }> = [
    {id: 1, title: "Test Post", content: "# test post"}
];
export async function GET({ params }) {
	const { id } = params;

	// Fetch the blog post data from your data source
	const post = posts.find(post => post.id === parseInt(id));

	return json(post);
}
