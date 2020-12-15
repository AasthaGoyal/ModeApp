let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuidv4 = require("uuid/v4"),
  router = express.Router();

const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// User model
let Item = require("../models/image");

router.post(
  "/upload-images",
  upload.array("imgCollection", 10),
  (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/uploads/" + req.files[i].filename);
    }

    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      imgCollection: reqFiles,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      care: req.body.care,
      size: req.body.size,
      stock: req.body.stock,
      color: req.body.color,
      category: req.body.category,
    });

    console.log('just so you know i m alive ');
    item
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          success: true,
          result,
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            success: false,
            error: err,
          });
      });
  }
);

router.get("/getAllItems", (req, res, next) => {
  Item.find().then((data) => {
    res.status(200).json({
      items: data,
    });
  });
});

router.get("/getItemById/:id", (req, res, next) => {
  Item.findById(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) res.send(err);
    res.status(200).json({
      success: true,
      data,
    });
  }).catch((err) => console.log(err));
});

// router.get("/getSortedItems/:category", (req, res, next) => {
//   console.log("params are", req.query, "category is", req.params.category);

//   Item.find(
//     {
//       category: req.params.category,
//     },
//     (err, data) => {
//       if (err) {
//         return res.send.json({
//           success: false,
//           error: err,
//         });
//       }

//       res.status(200).json({
//         success: true,
//         data,
//       });
//     }
//   )
//     .sort({ price: JSON.parse(req.query.sort) })
//     .limit(JSON.parse(req.query.limit));
// });

// router.get("/getFilteredItems/:category", (req, res, next) => {
//   console.log("params are", req.query, "category is", req.params.category);

//   Item.find(
//     {
//       category: req.params.category,
//       price: {
//         $gte: 200,
//         $lte: 3000,
//       },
//       color: "#ffe900",
//       size: "S, M",
//     },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.send.json({
//           success: false,
//           error: err,
//         });
//       }

//       res.status(200).json({
//         success: true,
//         data,
//       });
//     }
//   )
//   .sort({ price: JSON.parse(req.query.sort)  })
//   .limit(JSON.parse(req.query.limit) );
// });

router.get("/getSizeFiltered", (req, res, next) => {
  console.log("sizes received", req.query);
  req.query.size.map((sz) => {
    Item.aggregate(
      [
        {
          $unwind: "$size",
        },
        {
          $match: {
            size: sz,
          },
        },
      ],
      (err, data) => {
        console.log(data);

        // res.status(200).json({
        //   success: true,
        //   data,
        // });
        res.send(data);
      }
    )
    .catch(err => console.error(err));
  });
});

router.get("/getFilters", (req, res, next) => {
  Item.find({})
    .select({ price: 1 })
    .sort({ price: -1 })
    .limit(1)
    .exec(function (err, docs) {
      if (err) {
        return res.send.json({
          success: false,
          error: err,
        });
      }

      res.status(200).json({
        success: true,
        price: docs[0].price,
      });
    });
});

router.get("/getItemByCategory/:category", (req, res, next) => {
  Item.find({ category: req.params.category }, (err, data) => {
    if (err) {
      return res.send.json({
        success: false,
        error: err,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  });
});

router.get("/getItemBySearch/:query", (req, res, next) => {
  console.log("the params are", req.params);
  Item.find(
    { name: req.params.query.name, category: req.params.query.category },
    (err, data) => {
      if (err) {
        return res.send.json({
          success: false,
          error: err,
        });
      }

      res.status(200).json({
        success: true,
        data,
      });
    }
  );
});

router.post("/deleteItemById/:id", (req, res, next) => {
  console.log("the id being deleted is", req.params.id);
  Item.findByIdAndRemove(
    new mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.status(200).json({
        success: true,
        message: `File with ID ${req.params.id} is deleted successfully`,
      });
    }
  );
});

router.post(
  "/updateItemById/:id",
  upload.array("imgCollection", 10),
  (req, res, next) => {
    Item.findById(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) console.log("Error:", err);

      const reqFiles = [];
      const url = req.protocol + "://" + req.get("host");
      for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + "/uploads/" + req.files[i].filename);
      }

      if (reqFiles.length > 0) {
        data.imgCollection = reqFiles;
      }
      data.name = req.body.name;
      data.desc = req.body.desc;
      data.price = req.body.price;
      data.care = req.body.care;
      if (req.body.size) {
        data.size = req.body.size;
      }
      data.stock = req.body.stock;
      data.color = req.body.color;
      data.category = req.body.category;

      data
        .save()
        .then((result) => {
          res.status(201).json({
            success: true,
            result,
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              success: false,
              error: err,
            });
        });
    });

    // item.save(req.params.id, req.body, (err, data) => {
    // 	if(err) console.log(error);
    // 	console.log('data is', data);
    // 	// if (err) {
    // 	// 	return res.status(404).json({ err: err });

    // 	// }

    // 	// res.status(200).json({
    // 	// 	// success: true,
    // 	// 	// message: `File with ID ${req.params.id} has been updated`,
    // 	// 	data,
    // 	// });
    // });
  }
);

module.exports = router;
