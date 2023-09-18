import { DataTypes } from 'sequelize';


let Album : any;

(async() => {
    const { sequelizeDB } = await import('../middleware/db');
    const { Music } = await import('./Music');

    Album = sequelizeDB.define('album', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    });

    Album.belongsTo(Music, { foreignKey: 'id_music' });
})()

export { Album }