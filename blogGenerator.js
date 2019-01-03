const fs = require("fs");
const data = fs.readFileSync("./blogs.json");

const blogs = JSON.parse(data);

const withTags = function(tag, content) {
  return ["<", tag, ">", content, "<", "/", tag, ">"].join("");
};

const themeSelector = function(theme) {
  let themePath = 'rel="stylesheet" type="text/css" href= "' + theme + '.css"';
  return "<link " + themePath + "/>";
};

const imageTags = function(name, path) {
  let imgtag =
    "<img " + "src =" + '"' + path + '"' + "alt=" + '"' + name + '"' + ">";
  return imgtag;
};

const title = withTags("h1", blogs.title);
const description = withTags("p", blogs.description);

const stylesheet = themeSelector(blogs.theme);
const head = withTags("head", stylesheet);

const postGenerator = function(post) {
  const title = withTags("h2", post.title);
  const description = withTags("p", post.description);
  const author = withTags("h4", post.author);
  const date = withTags("h4", post.date);
  const img = imageTags(post.title, post.imagePath);

  return withTags("div", title + img + description + author + date);
};

const posts = blogs.posts.map(postGenerator).join("");

const body = withTags("body", title + description + posts);
console.log(withTags("html", head + body));
