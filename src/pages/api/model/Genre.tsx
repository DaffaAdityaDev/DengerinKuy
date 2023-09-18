import { DataTypes } from 'sequelize';

let Genre :  any;

(async() => {
    const { sequelizeDB } = await import('../middleware/db');

    Genre = sequelizeDB.define('genre', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
})();

export { Genre };