import { Link, useNavigate } from "react-router-dom";

export const Post = (props) => {
    const {id, content, created} = props.post;
    const navigate = useNavigate();
 
    return (
        <div className="post" id={id} onClick={() => navigate(`/posts/${id}`)}>
            <div className="post__date">
                created: {new Date(created).toDateString()}
            </div>
            <div className="post__content">
                {content}
            </div>
        </div>
    )
}