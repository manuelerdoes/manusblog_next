import { getUser } from "./dbActions";

export async function addUsernameToBloglist(bloglist) {
  let userlist = [];
  for (const blog of bloglist) {
    const user = await getUser(blog.userId);
    userlist.push({
      ...blog,
      username: user?.name
    })
  }
  return userlist
}