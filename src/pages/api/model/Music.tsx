import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../Middleware/db';
import Album from './Album';

export default sequelizeDB.define('music', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
});
