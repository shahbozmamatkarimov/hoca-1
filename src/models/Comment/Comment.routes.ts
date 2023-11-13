import express, { Router } from 'express';
import CommentController from './Comment.contr.js';
import authMiddleware from '../../middleware/auth.js';

const commentRouter: Router = express.Router();

commentRouter.post('/create',authMiddleware, CommentController.createComment);
commentRouter.get('/all', CommentController.getAllComments);
commentRouter.get('/:id', CommentController.getCommentById);
commentRouter.put('/:id',authMiddleware, CommentController.updateComment);
commentRouter.delete('/:id', CommentController.deleteComment);

// Define other comment-related routes as needed

export default commentRouter;
