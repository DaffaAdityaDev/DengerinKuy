import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../Middleware/db';


export default sequelizeDB.define('genre', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

