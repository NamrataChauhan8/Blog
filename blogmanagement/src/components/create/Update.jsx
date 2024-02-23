import React, { useState, useEffect, useContext } from "react";

import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
// import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation , useParams} from "react-router-dom";

import API from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { Update as UpdateIcon } from "@mui/icons-material"; // Rename the imported icon

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

// const Image = styled('img')({
//     width: '100%',
//     height: '50vh',
//     objectFit: 'cover'
// });

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  border: 1px solid black;
  margin-top: 20px;
  top: 200;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  border: 1px solid black;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Update = () => {
  const navigate = useNavigate();
  const {id} = useParams()

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');

  
useEffect(()=>{
    const fetchData = async()=>{
        let response=await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
},[])
  // useEffect(() => {
  //     const getImage = async () => {
  //         if(file) {
  //             const data = new FormData();
  //             data.append("name", file.name);
  //             data.append("file", file);

  //             //API call
  //             const response = await API.uploadFile(data);
  //             post.picture = response.data;
  //         }
  //     }
  //     getImage();

  const { account } = useContext(DataContext);
  const location = useLocation();

  post.categories = location.search?.split("=")[1] || "All";
  post.username = account.username;
//   }, [file])

  const updateBlogPost = async () => {
    try {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    } catch (error) {
        handleError(error);
    }
}
const handleError = (error) => {
    console.error(error);
    // Other error handling logic
}


  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      {/* <Image src={url} alt="post" /> */}

      <StyledFormControl>
        <label htmlFor="fileInput">
                    {/* <Add fontSize="large" color="action" /> */}
                </label>
                {/* <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                /> */}
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
          placeholder="Title"
        />
        <Button
          variant="contained"
          onClick={() => updateBlogPost()}
          style={{ marginTop: "20px" }}
          color="primary"
        >
          Update
        </Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name="description"
        value={post.description} 
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default Update;
