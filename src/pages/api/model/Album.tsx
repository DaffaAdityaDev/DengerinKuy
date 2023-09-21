import { DataTypes } from 'sequelize';
import { sequelizeDB } from '../Middleware/db';
import  Music  from './Music';


export default sequelizeDB.define('album', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
});


