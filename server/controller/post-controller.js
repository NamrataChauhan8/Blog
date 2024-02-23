import { response } from "express";
import Post from "../model/post.js";

export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.status(500).json({ error: 'An error occurred while fetching the post' });
    }
}

export const getAllPosts = async (request, response) => {
    // let username = request.query.username;
    let category = request.query.category;
    let posts
    try {
        if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }
        return response.status(200).json(posts);

    } catch (error) {
        // console.error(error); // Log the error for debugging
        return response.status(500).json({ msg: error.message });
    }
}

export const updatePost=async(request,response)=>{
    try{
        const post =await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({msg: 'post not found'})
        }

        await Post.findByIdAndUpdate(request.params.id, {$set: request.body})
        return response.status(200).json({msg: 'post updated successfully'})
    }catch(error){
        return response.status(500).json({ msg: error.message });
    }
}

export const deletePost = async (request, response) => {
    try {
        // Validate request parameters
        const postId = request.params.id;
        if (!postId) {
            return response.status(400).json({ error: 'Post ID is required' });
        }

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return response.status(404).json({ error: 'Post not found' });
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

        // Return success response
        return response.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting post:', error);
        return response.status(500).json({ error: 'An error occurred while deleting the post' });
    }
}