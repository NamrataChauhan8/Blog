import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        const commentId = request.params.id;
        if (!commentId) {
            return response.status(400).json({error: 'comment id is required'});
        }
        const comment =await Comment.findById(commentId);

        if (!comment) {
            return response.status(404).json({ error: 'Comment not found' });
        }

        await Comment.findByIdAndDelete(commentId);

        response.status(200).json({succes:true,message:'comment deleted successfully'});
    } catch (error) {
        console.error("Error Deleting comment",error)
       return response.status(500).json({error:"An error occured while deleting comment"})
    }
}
