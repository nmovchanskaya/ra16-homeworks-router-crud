import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createRequest } from "../api/createRequest";
import { FormEdit } from "./FormEdit";

export const PostDetails = (props) => {

    const {post, setPost, deletePost, editPost, formEdit, setFormEdit} = props; 
    const params = useParams();
    const [edit, setEdit] = useState(false);
    const url  = 'http://localhost:7070/posts/';

    useEffect(() => {
        //get post from server
        if (params.id) {
            const resp = createRequest({
                url: `${url}${params.id}`, 
                sendMethod: 'GET', 
                callback: (data) => {setPost(data)}
            })
        }
    }, [params.id]);

    const navigate = useNavigate();
 
    if (post && !edit) {
        return (
            <div className="post" id={post.post.id}> 
                <div className="post__date">
                    created: {post.post.created}
                </div>
                <div className="post__content">
                    {post.post.content}
                </div>
                <button className="post__edit_button"
                    onClick={() => {
                        setEdit(true);
                        navigate(`/posts/${post.post.id}`);
                    }}
                >Edit</button>
                <button className="post__delete_button"
                    onClick={() => {
                        deletePost(post.post.id);
                        navigate('/');
                    }}
                >Delete</button>
            </div>
        )
    }
    if (post && edit) {
        return (
            <div className="post" id={post.post.id}> 
                <div className="post__date">
                    created: {post.post.created}
                </div>
                <FormEdit id={post.post.id} created={post.post.created} editPost={editPost} setFormEdit={setFormEdit} formEdit={formEdit} setEdit={setEdit}/>
            </div>
        )
    }

    return (
        <></>
    )
}