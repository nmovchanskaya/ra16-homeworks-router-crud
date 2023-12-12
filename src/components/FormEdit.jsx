import { useNavigate } from "react-router-dom";

export const FormEdit = (props) => {

    const {id, created, editPost, setFormEdit, formEdit, setEdit} = props;
    const navigate = useNavigate();

    const handlerInputChange = (event) => {
        const {name, value} = event.target;
        setFormEdit({...formEdit, [name]: value});
    }

    return (
        <form onSubmit={event => event.preventDefault()} className="editform">
            <input 
                className="editform__input"
                name="content"
                value={formEdit.content}
                onChange={handlerInputChange} 
            />
            <button type="submit" className="editform__submit" onClick={async () => {
                await editPost(id, formEdit.content, created);
                setEdit(false);
                navigate(`/posts/${id}`);
            }}>Save</button>
        </form>
    )
}
