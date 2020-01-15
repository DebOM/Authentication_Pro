const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", (req, res) => {
  res.send("will render app here");
});

router.get("/tokenVerify", verify, (res, req) => {
  // res.json({
  //   posts: {
  //     title: "my first post",
  //     description: "random data you shouldnt access"
  //   }
  // });
  // res.send(req.user);
  console.log(req.user);
});
module.exports = router;
