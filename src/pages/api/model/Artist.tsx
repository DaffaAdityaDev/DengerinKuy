import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../middleware/db';


export default sequelizeDB.define('artists', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
