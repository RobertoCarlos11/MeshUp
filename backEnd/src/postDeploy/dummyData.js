import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";

export const createDummyData = async () => {
    try {
        // Create dummy users
        await User.bulkCreate([
            {
                Email: "user1@example.com",
                Username: "user1",
                Pass: "password1",
                Profile_Picture: null,
                Birthdate: "1990-01-01"
            },
            {
                Email: "user2@example.com",
                Username: "user2",
                Pass: "password2",
                Profile_Picture: null,
                Birthdate: "1992-02-02"
            },
            {
                Email: "user3@example.com",
                Username: "user3",
                Pass: "password3",
                Profile_Picture: null,
                Birthdate: "1994-03-03"
            }
        ]);

        // Create dummy categories
        await Category.bulkCreate([
            {
                Category_Name: "Technology",
                Category_Description: "All about the latest tech"
            },
            {
                Category_Name: "Health",
                Category_Description: "Health and wellness tips"
            },
            {
                Category_Name: "Travel",
                Category_Description: "Travel guides and tips"
            }
        ]);

        console.log("Dummy data created successfully!");
    } catch (error) {
        console.error("Error creating dummy data:", error);
    }
};
