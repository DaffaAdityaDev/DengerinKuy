import { DataTypes } from 'sequelize';

let Artist : any;

(async() => {
    const { sequelizeDB } = await import('../middleware/db');
    const { Music } = await import('./Music');

    Artist = sequelizeDB.define('artists', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Artist.belongsTo(Music, { foreignKey: {
        name: 'id_artists',
    } })
})()

export { Artist };