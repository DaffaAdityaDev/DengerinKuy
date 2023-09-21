import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../Middleware/db';


export default sequelizeDB.define('artists', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
