const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("will render app here");
});

module.exports = router;
