import fs from 'fs';
import path from 'path';

export function syncModels(sequelize) {
  let models = {};
  fs
    .readdirSync(__dirname)
    .filter(
      file => file.slice(-3) !== '.js' && file !== path.basename(module.filename)
    )
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      models[model.name] = model;
    });
  return models;
}
