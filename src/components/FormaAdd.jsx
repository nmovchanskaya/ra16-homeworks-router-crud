import { useNavigate } from "react-router-dom";

export const FormAdd = (props) => {

    const {addPost, setFormAdd, formAdd} = props;
    const navigate = useNavigate();

    const handlerInputChange = (event) => {
        const {name, value} = event.target;
        setFormAdd({...formAdd, [name]: value});
    }

    return (
        <form onSubmit={event => event.preventDefault()} className="addform">
            <input 
                className="addform__input"
                name="content"
                value={formAdd.content}
                onChange={handlerInputChange} 
            />
            <button type="submit" className="addform__submit" onClick={async () => {
                await addPost(formAdd.content);
                navigate('/');
            }}>Save</button>
        </form>
    )
}