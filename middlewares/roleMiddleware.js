// roleMiddleware(["superadmin", "admin"])

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Convert single role string → array
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Check if admin role is included in allowed list
      if (!roles.includes(req.admin.role)) {
        return res.status(403).json({
          message: `Access denied. Only [${roles.join(", ")}] allowed.`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Role check failed" });
    }
  };
};
