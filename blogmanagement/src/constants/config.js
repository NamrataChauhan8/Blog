export const API_NOTIFICATION_MESSAGE={
    loading:{
        title:'Loading...',
        message:'Data is being loaded please wait'
    },
    success:{
        title:'success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'error',
        message:'an error occured while fethching response from the server. please try again'
    },
    requestFailure:{
        title:'error',
        message:'an error occured while parsing request data'
    },
    networkError:{
        title:'error',
        message:'unable to connect with server. Please check internet connectivity and try again later'
    }
}
//API SERVICE CALL
export const SERVICE_URLS={
    userSignup: {url: '/signup', method:'POST'},
    userLogin: {url: '/login', method:'POST'},
    // uploadFile: {url: '/file/upload', method:'POST'},
    createPost: {url: 'create', method: 'POST'},
    getAllPosts: {url: 'posts', method: 'GET', params:true},
    getPostById: { url: 'post', method: 'GET', query: true },
    updatePost: {url: 'update' , method: 'PUT', query:true},
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getComments: {url: 'comments', method: 'GET', query: true},
    deleteComment: {url: 'comment/delete' , method: "DELETE" , query: true}
}