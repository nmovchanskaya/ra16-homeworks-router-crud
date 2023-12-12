import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PostList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { FormAdd } from './components/FormaAdd';
import { createRequest } from './api/createRequest';
import './App.css';

function App() {
  const initPosts = [
    {
      id: 1,
      content: 'test',
      created: 123456723
    },
    {
      id: 2,
      content: 'test2',
      created: 123456723
    }
  ];

  const url = 'http://localhost:7070/posts/';

  const [posts, setPosts] = useState(initPosts);
  const [post, setPost] = useState(undefined);
  const initialState = {
    content: ''
  }
  const [formEdit, setFormEdit] = useState(initialState);
  const [formAdd, setFormAdd] = useState(initialState);

  const getPosts = () => {
    const resp = createRequest({
      url: url, 
      sendMethod: 'GET', 
      callback: (data) => {setPosts(data)}
    });
  }

  const deletePost = (id) => {
    const resp = createRequest({
        url: `${url}${id}`, 
        sendMethod: 'DELETE', 
        id: id,
        callback: (res) => {
          console.log(res);
          setPosts(prevPosts => 
            prevPosts.filter(item => item.id !== id)
          );
        }
    })
  }

  const editPost = async (id, content, created) => {

    const post = {
        "id": id,
        "content": content,
        "created": created
    };

    const resp = await createRequest({
      url: `${url}${id}`, 
      sendMethod: 'PUT',
      id: id,
      post: post,
      callback: (res) => {
        console.log(res);
        setPost({post: post});
      }
    })
  }

  const addPost = async (content) => {

    const post = {
        "id": 0,
        "content": content,
        "created": Date.now()
    };

    const resp = await createRequest({
      url: url, 
      sendMethod: 'POST',
      post: post,
      callback: (res) => {
        console.log(res);
        getPosts();
      }
    })
  }

  useEffect(() => {
    getPosts();

    return() => {}
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PostList posts={posts}/>}/>
        <Route path="/posts/:id" element=
          {<PostDetails 
            post={post}
            setPost={setPost}
            deletePost={deletePost} 
            editPost={editPost}
            formEdit={formEdit}
            setFormEdit={setFormEdit}
          />}
        />
        <Route path="/add" element={<FormAdd 
          addPost={addPost}
          formAdd={formAdd}
          setFormAdd={setFormAdd}
        />}/>
      </Routes>
    </div>
  );
}

export default App;
