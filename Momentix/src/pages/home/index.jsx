import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css"
import {FaTrash, FaEdit} from "react-icons/fa"
import {useNavigate} from "react-router-dom"

export default function Home() {
    const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            const result = response.data;
            if (result && result.blogList && result.blogList.length) {
                setBlogList(result.blogList);
                setPending(false)
            }
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false);
            
        }
    }
    async function handleDeleteBlog(getCurrentId) {
        try {
            const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`); // Use backticks for template literals
            const result = response.data;
    
            if (result?.message) {
                fetchListOfBlogs(); // Refresh the blog list after deletion
                navigate(0)
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }
    async function handleEdit(getCurrentBlogItem){
        console.log(getCurrentBlogItem);
        navigate('/add-blog', {state: {getCurrentBlogItem}})
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div  className={classes.wrapper}>
            <h1>Blog List</h1>
            {pending ? (
                <h1>Loading Blogs! Please Wait...</h1>
            ) : (
                <div className={classes.blogList}>
                    {blogList && blogList.length ? blogList.map((blogItem) => (
                        <div key={blogItem._id}>
                            <h3>{blogItem.title}</h3>
                            <p>{blogItem.description}</p>
                            <FaEdit onClick={() => handleEdit(blogItem)} size={30}/>
                            <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={30}/>
                        </div>
                    )): <h3>No Blogs Added</h3>}
                </div>
            )}
        </div>
    );
}
