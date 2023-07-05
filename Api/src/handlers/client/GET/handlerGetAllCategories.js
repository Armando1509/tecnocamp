const getAllCategories = require("../../../controllers/client/GET/getAllCategories");

const handlerGetAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllCategories;
