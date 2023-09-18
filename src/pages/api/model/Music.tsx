import { DataTypes } from 'sequelize';

let Music : any; // Declare the variable outside the async function

(async () => {
    const { sequelizeDB } = await import('../middleware/db');
    const { Album } = await import('./Album');
    const { Artist } = await import('./Artist');

  Music = sequelizeDB.define('music', {
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
    id_album: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_artists: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
  });

  Music.hasMany(Album, { foreignKey: 'id_music' });
  Music.hasOne(Artist, { foreignKey: 'id_artists' });
  
})();

// Export the music model
export { Music };
