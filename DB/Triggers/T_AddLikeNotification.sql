USE DB_MeshUp;

DROP TRIGGER IF EXISTS `AddLikeNotification`;

CREATE TRIGGER `AddLikeNotification` AFTER INSERT ON `Like`
FOR EACH ROW
BEGIN
    IF NEW.`ThingLiked` = 'post' THEN
    INSERT INTO notification(Matter, Emitter_Email, PostId)VALUES("Left a Like", NEW.Email, NEW.`ThingLikedId`);
    END IF; 
END 