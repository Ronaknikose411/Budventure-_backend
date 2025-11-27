const Admin = require("../models/Admin");

const seedSuperAdmin = async () => {
  try {
    const email = "superadmin@gmail.com";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("SuperAdmin already exists");
      return;
    }

    // ❌ DO NOT HASH HERE
    // The model pre("save") hook will hash automatically

    await Admin.create({
      name: "Super Admin",
      email,
      password: "SuperAdmin5050",   // plain password only here
      role: "superadmin",
    });

    console.log("SuperAdmin created successfully!");
  } catch (error) {
    console.log("Failed to create SuperAdmin:", error.message);
  }
};


module.exports = seedSuperAdmin;
