 const Tour = require("../models/tourModel");
 const Category = require("../models/categoryModel");
 const multer = require("multer");

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front/public/images/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.uploadImage = multer({ 
  storage: storage,
 });

 exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.createTour = async (req, res) => {
  try {
    let images;
    if (req.file) {
      images = `/images/${req.file.originalname}`;
    } else {
      images = ''; 
    }
    const newTour = await Tour.create({...req.body, photo: images});

    await Category.findByIdAndUpdate(req.body.category, {
      $push: {tours: newTour._id},
    });
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}

// exports.deleteTour = async (req, res) => {
//   try {
//     await Tour.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// }
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }
    await Tour.findByIdAndDelete(req.params.id);

    await Category.findByIdAndUpdate(tour.category, {
      $pull: { tours: req.params.id },
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};