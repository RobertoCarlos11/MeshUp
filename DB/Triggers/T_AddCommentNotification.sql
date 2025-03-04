USE DB_MeshUp;

DROP TRIGGER IF EXISTS `AddCommentNotification`;
CREATE TRIGGER `AddCommentNotification` AFTER INSERT ON Comment
FOR EACH ROW
BEGIN
    INSERT INTO notification(Matter, Emitter_Email,PostId)VALUES("Left a comment:", NEW.Email, NEW.`PostId`);
END;