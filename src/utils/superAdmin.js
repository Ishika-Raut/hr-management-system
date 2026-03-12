import bcrypt from "bcrypt";
import User from "../models/userModel.js";

//A seed script is code used to insert initial/default data into the database automatically.
//Examples of seeded data: Super Admin, Default roles, Default permissions, Default settings
//It usually runs once when the application starts or manually via a command.

export const createSuperAdmin = async () => {

  try 
  {
    const checkSuperAdmin = await User.findOne({role: "superAdmin", email: "super.admin@yopmail.com"});

    if (checkSuperAdmin) 
    {
        //return next(AppError("Super admin already exists!", HTTP_STATUS.CONFLICT));
        console.log("Super admin already exist!");
        process.exit(0);  //normal exit
    }

    const hashedPassword = await bcrypt.hash("SuperAdmin", 10);

    await User.create({
      name: "Super Admin",
      email: "super.admin@yopmail.com",
      password: hashedPassword,
      role: "superAdmin"
    });
    process.exit(0);

  } 
  catch (error) 
  {
    console.log("Error creating super admin:", error);
    process.exit(1); //error exit
  }

};