const fileRepository = require('../repository/fileRepository.js');

const FileModel = require('../models/file.js');

const getById = async (id) => {
  return fileRepository.getById(id);
};

const save = async (path) => {
  const file = new FileModel(path);

  const rez = await fileRepository.save(file);
  return rez;
};

module.exports = { getById, save };
