import User, { associate as associateUser } from "./user";
import Comment, { associate as associateComment } from "./comment";
import Post, { associate as associatePost } from "./post";
import Image, { associate as associateImage } from "./image";
import Hashtag, { associate as associateHashtag } from "./hashtag";

export * from "./sequelize";

const db = {
    User,
    Comment,
    Post,
    Image,
    Hashtag,
};

export type dbType = typeof db;
associateUser(db);
associateComment(db);
associatePost(db);
associateImage(db);
associateHashtag(db);
