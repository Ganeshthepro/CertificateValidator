const protected = (req, res, next) => {
   try {
      const { token } = req.cookie;

      if (!token)
         return res.status(400).json({ status: "error", msg: "unAuthorize" });
      next();
   } catch (error) {
      res.status(500).json({ status: "error", msg: error.message });
   }
};

module.exports = protected;
