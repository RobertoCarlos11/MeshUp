import pool from "../config/db.js";

export default class userModel {
    static async getUsers()
    {
        try{
            const [rows] = await pool.query("SELECT * FROM ´user´");
            return [rows];
        }
        catch(error)
        {
            console.error("Database error:", error);
            throw error;
        }
    }
    
    static async logIn(user,password)
    {
        try {
            const [rows] = await pool.query("SELECT * FROM ´user´ WHERE Username = ? AND password = ?", [user, password]);
            return rows[0] || null;
        }
        catch(error)
        {
            console.error("Database error:", error);
            throw error;
        }
    }
}