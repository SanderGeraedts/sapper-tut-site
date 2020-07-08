import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";

function getAllPosts(filesPath) {
  const data = fs.readdirSync(filesPath).map(fileName => {
    const post = fs.readFileSync(path.resolve(filesPath, fileName), "utf-8");

    // Parse Front matter from string
    const { data, content } = grayMatter(post);

    // Turns markdown into html
    const renderer = new marked.Renderer();
    const html = marked(content, { renderer });

    // Builds data
    return {
      ...data,
      html
    };
  });

  return data;
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Newest post first
    return dateB - dateA;
  });
}

export function get(req, res) {
  const posts = getAllPosts("src/posts");

  const sorted = sortPosts(posts);

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify(sorted));
}
