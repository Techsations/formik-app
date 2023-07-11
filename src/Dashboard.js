import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Edit from './Edit' // Import the Edit component


const Dashboard = () => {
  const [editPostId, setEditPostId] = useState(null); // State variable to store the ID of the post to be edited


  const onSubmit = (values) => {
    axios.post("http://localhost:1010/view-post", values).then((res) => {
      // console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleEdit = (postId) => {
    console.log("Edit button clicked for post ID:", postId);
    setEditPostId(postId); // Set the post ID in the state variable
    // navigate("/edit")

  };

  const navigate = useNavigate()
  const [currUser, setCurrUser] = useState("");
  const [allPosts, setallPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:1010/signin")
      .then((res) => {
        // console.log(res.data);
        if (!res.data.username) {
          alert("No user");
          navigate("/login");
        } else {
          setCurrUser(res.data.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { handleSubmit, handleChange, errors, touched, handleBlur, values } = useFormik({
    enableReinitialize: true, // Add this option
    initialValues: {
      content: "",
      username: currUser,
    },
    onSubmit,
  });

  // console.log(values);

  return (
    <>
      <h1>Welcome to your Dashboard {currUser}</h1>
      <form action='submit' onSubmit={handleSubmit} className='align-items-center'>
        <input type="text" name='content' onChange={handleChange} className='border border-black rounded mx-2' />
        <button className='btn btn-success'>Post</button>
      </form>
      <div>
        {
          useEffect(() => {
            axios.get("http://localhost:1010/view-post")
              .then((res) => {
                setallPosts(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }, [])}

        {
          useEffect(() => {
            console.log(allPosts);
          }, [allPosts])
        }


        {
          allPosts.map((post) => (
            <div className='d-flex justify-content-center text-center' key={post.id}>
              <div className='w-75 shadow-lg rounded-3 py-2 my-2'>
                <h6>{post.username}</h6>
                <p className='fs-5'>{post.content}</p>
                <div className='d-flex justify-content-around'>
                  <button className='btn btn-success' onClick={() => handleEdit(post.id)}>Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            </div>
          ))
        }


        {editPostId && <Edit postId={editPostId} />}
      </div>

    </>
  )
}

export default Dashboard