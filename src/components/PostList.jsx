import { Post } from "./Post";
import { useNavigate } from "react-router-dom";

export const PostList = (props) => {
    const {posts} = props;
    const navigate = useNavigate();
    
    return (
        <>
            <button className="addbutton" onClick={() => {
                navigate('/add');
            }}>
                Add post
            </button>
            {posts.map((item) => {
                return (
                    <Post post={item}/>
                )
            })}
        </>
    )
}