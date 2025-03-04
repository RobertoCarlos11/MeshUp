import sequelize from "../config/db.js";
import User from "./UserModel.js";
import Post from "./PostModel.js";
import Model from "./3DFileModel.js";
import Category from "./CategoryModel.js";
import Comment from "./CommentModel.js";
import Collection from "./CollectionModel.js";
import SearchHistory from "./SearchHistoryModel.js";
import Notification from "./NotificationModel.js";
import CollectionElement from "./CollectionElementModel.js";
import Likes from "./LikeModel.js";

User.hasMany(Post, {foreignKey:"Email", as:"posts"});
Post.belongsTo(User,{foreignKey:"Email", as:"user"});

User.hasMany(Comment, {foreignKey:"Email", as:"comments"});
Comment.belongsTo(User, {foreignKey:"Email", as:"user"});

User.hasMany(Collection, {foreignKey:"Email", as:"collections"});
Collection.belongsTo(User,{foreignKey:"Email", as:"user"});

User.hasMany(Likes, {foreignKey:"Email", as:"likes"});
Likes.belongsTo(User, {foreignKey:"Email", as:"user"});

User.hasMany(SearchHistory, {foreignKey:"Email", as:"history"});
SearchHistory.belongsTo(User,{foreignKey:"Email", as:"user"});

User.hasMany(Notification, {foreignKey:"Emitter_Email", as:"notifications"});
Notification.belongsTo(User,{foreignKey:"Emitter_Email", as:"emitter"});

Post.belongsTo(Model,{foreignKey:"ModelId", as:"model"});
Model.hasOne(Post,{foreignKey:"ModelId", as:"posts"});

Post.belongsTo(Category,{foreignKey:"CategoryId", as:"category"});
Category.hasMany(Post, {foreignKey:"CategoryId",as:"posts"});

Post.hasMany(Comment,{foreignKey:"PostId", as:"comments"});
Comment.belongsTo(Post, {foreignKey:"PostId", as:"posts"});

Post.hasMany(Notification,{foreignKey:"PostId", as:"notifications"});
Notification.belongsTo(Post,{foreignKey:"PostId", as:"posts"});

Collection.hasMany(CollectionElement, { foreignKey: "CollectionId", as: "elements" });
CollectionElement.belongsTo(Collection, { foreignKey: "CollectionId", as: "collection" });

Post.hasMany(CollectionElement, { foreignKey: "PostId", as: "collectionElements" });
CollectionElement.belongsTo(Post, { foreignKey: "PostId", as: "post" });

const syncDB = async () => 
{
  try {
    await sequelize.sync({alter:false});
    console.log("Database Synchronized");
  }catch(error)
  {
    console.error("Error syncing database", error);
  }
};

export {syncDB,sequelize};