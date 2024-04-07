import blog1 from "./Blog1";
import blog2 from "./Blog2";

export const findBlogById = (id: string) => {
    const blog = blogArray.find(item => item._id === id);
    if (blog) {
        return blog.blog
    }
    return null;
}

export const blogArray = [ 
    {_id: blog1._id, title: blog1.title, blog: blog1},
    {_id: blog2._id, title: blog2.title, blog: blog2},
]