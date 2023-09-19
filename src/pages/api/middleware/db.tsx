import { Sequelize } from 'sequelize';

export const createSequelizeDB = () => {
    return new Sequelize('dengerinkuy', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    });
}

export const sequelizeDB = createSequelizeDB();


const checkIfModelExists = async () => {
    const Music = (await import('../model/Music')).default;
    const Genre = (await import('../model/Genre')).default;
    const Artist = (await import('../model/Artist')).default;
    const Album = (await import('../model/Album')).default;

    Album.hasMany(Music, { foreignKey: 'albumId', as: 'musics' });
    Music.belongsTo(Album, { foreignKey: 'albumId', as: 'album' });

    Artist.hasMany(Music, { foreignKey: 'artistId', as: 'musics' });
    Music.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });

    
    try {
        // // Check if the table already exists in the database
        // const tableExistsMusic = await Music.sync({ alter: false });
        // const tableExistsGenre = await Genre.sync({ alter: false });
        // const tableExistsArtist = await Artist.sync({ alter: false });
        // const tableExistsAlbum = await Album.sync({ alter: false });
        
        // const joinTableISExists = [...tableExistsMusic, ...tableExistsGenre, ...tableExistsArtist, ...tableExistsAlbum]

        // for (let i = 0; i < joinTableISExists.length; i++) {
        //     const element = joinTableISExists[i];
        //     if (element) {
        //         console.log("Table exists");    
        //     } else {
        //         console.log("Table does not exist Loop");
        //     }

        // }
        await sequelizeDB.sync({ force: true });
        console.log("All models were synchronized successfully.");

    } catch (error) {
        console.log("Model does not exist");
    }
}

export const checkConnection = async () => {
    try {
        await sequelizeDB.authenticate();
        console.log('Connection has been established successfully.');
        checkIfModelExists();
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

