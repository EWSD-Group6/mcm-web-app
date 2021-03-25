import {CommentCommentRes} from '../../api';

export interface Comment extends CommentCommentRes{
}

export const createComment = (params: Partial<Comment>) => ({
  ...params
} as Comment);
