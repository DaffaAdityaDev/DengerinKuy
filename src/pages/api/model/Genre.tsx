import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../middleware/db';


export default sequelizeDB.define('genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

