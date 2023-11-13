import { Request, Response } from "express";
import Comment from "./Comment.model.js";
import { IComment } from "./Comment.interface";
import handleError from "../../utils/catchError.js";
import Post from "../Posts/posts.model.js";

class CommentController {
  public createComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId, content }: IComment = req.body;

      if (!postId || !content || !req.user.id) {
        res
          .status(400)
          .json({ error: "User, postId, and content are required fields." });
        return;
      }

      const comment = await Comment.create({
        user: req.user.id,
        content,
      });

      const postComment = await Post.findByPk(postId);

      if (postComment) {
        // Assuming there is a 'comments' association on your Post model
        await postComment.addComment(comment);
      } else {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.status(201).send({
        success: true,
        data: comment,
      });
    } catch (error: any) {
      handleError(res, error);
    } 
  };
  // In comment.controller.ts
  public getAllComments = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const comments = await Comment.findAll();
      res.status(200).json(comments);
    } catch (error: any) {
      res.status(500).json({ error: "An error occurred" });
    }
  };
  // In comment.controller.ts
  public getCommentById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;

    try {
      const comment = await Comment.findByPk(id);

      if (!comment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }

      res.status(200).json(comment);
    } catch (error: any) {
      res.status(500).json({ error: "An error occurred" });
    }
  };
  // In comment.controller.ts
  public updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Retrieve the existing comment
      const comment = await Comment.findByPk(id);

      if (!comment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }

      // Get updated data from the request body
      const { content }: IComment = req.body;

      // Update the comment properties
      if (req.user.id) comment.user = req.user.id;
      if (content) comment.content = content;

      // Save the updated comment
      await comment.save();

      res.status(200).json(comment);
    } catch (error: any) {
      res.status(500).json({ error: "An error occurred" });
    }
  };
  // In comment.controller.ts
  public deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Find the comment by ID
      const comment = await Comment.findByPk(id);

      if (!comment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }

      // Delete the comment
      await comment.destroy();

      res.status(204).json(); // 204 status means success (no content)
        } catch (error: any) {
        res.status(500).json({ error: "An error occurred" });
        }
  };
}

export default new CommentController();

// import { Request, Response } from 'express';
// import CommentModel from './Comment.model.js';
// import { IComment } from './Comment.interface';
// import handleError from '../../utils/catchError.js';
// import postsModel from '../Posts/posts.model.js';

// class CommentController {
//     public createComment = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const { postId, content }: IComment = req.body;

//             if (!postId || !content || !req.user.id) {
//                 res.status(400).json({ error: 'User and content are required fields.' });
//                 return;
//             }

//             const comment: IComment = new CommentModel({
//                 user: req.user.id,
//                 content,
//             });
//             let postComment = await postsModel.findById(postId)
//             if (postComment) {
//                 postComment.comment.push(comment._id)
//                 await postComment.save();
//             } else {
//                 throw Error("post category not found")
//             }
//             const savedComment = await comment.save();
//             res.status(201).send({
//                 success: true,
//                 data: savedComment,
//             });
//         } catch (error: any) {
//             handleError(res, error)
//         }
//     };
//     // In comment.controller.ts
//     public getAllComments = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const comments = await CommentModel.find().exec();
//             res.status(200).json(comments);
//         } catch (error: any) {
//             res.status(500).json({ error: 'An error occurred' });
//         }
//     };
//     // In comment.controller.ts
//     public getCommentById = async (req: Request, res: Response): Promise<void> => {
//         const { id } = req.params;
//         try {
//             const comment = await CommentModel.findById(id);

//             if (!comment) {
//                 res.status(404).json({ error: 'Comment not found' });
//                 return;
//             }

//             res.status(200).json(comment);
//         } catch (error: any) {
//             res.status(500).json({ error: 'An error occurred' });
//         }
//     };
//     // In comment.controller.ts
//     public updateComment = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const { id } = req.params;

//             // Retrieve the existing comment
//             let comment: IComment | null = await CommentModel.findById(id);

//             if (!comment) {
//                 res.status(404).json({ error: 'Comment not found' });
//                 return;
//             }

//             // Get updated data from the request body
//             const { content }: IComment = req.body;
//             // Update the comment properties
//             if (req.user.id) comment.user = req.user.id;
//             if (content) comment.content = content;
//             // Save the updated comment
//             const updatedComment = await comment.save();
//             res.status(200).json(updatedComment);
//         } catch (error: any) {
//             res.status(500).json({ error: 'An error occurred' });
//         }
//     };
//     // In comment.controller.ts
//     public deleteComment = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const { id } = req.params;
//             // Find the comment by ID
//             const comment = await CommentModel.findById(id);

//             if (!comment) {
//                 res.status(404).json({ error: 'Comment not found' });
//                 return;
//             }
//             // Delete the comment
//             await CommentModel.findByIdAndDelete(id);
//             res.status(204).json(); // 204 status means success (no content)
//         } catch (error: any) {
//             res.status(500).json({ error: 'An error occurred' });
//         }
//     };
// }

// export default new CommentController();
