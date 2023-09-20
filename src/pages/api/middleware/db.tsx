// Import Sequelize for connecting with the DB
import { Sequelize } from 'sequelize';

// Create Sequelize connection
export const createSequelizeDB = () => {
    // Create and return new Sequelize instance (database connection)
    return new Sequelize('dengerinkuy', 'root', '', {
        // Host and dialect for the connection
        host: 'localhost',
        dialect: 'mysql'
    });
}

// Initialize and export the database connection
export const sequelizeDB = createSequelizeDB();

const checkIfModelExists = async () => {
    const Music = (await import('../Model/Music')).default;
    const Genre = (await import('../Model/Genre')).default;
    const Artist = (await import('../Model/Artist')).default;
    const Album = (await import('../Model/Album')).default;

    Album.hasMany(Music, { foreignKey: 'albumId', as: 'musics' });
    Music.belongsTo(Album, { foreignKey: 'albumId', as: 'album' });

    Artist.hasMany(Music, { foreignKey: 'artistId', as: 'musics' });
    Music.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });

    Artist.hasMany(Genre, { foreignKey: 'artistId', as: 'albums' });
    Genre.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' });

    const fakeDataMusic = [
        {
            name: 'Lagu 1',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
        {
            name: 'Lagu 2',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
        {
            name: 'Lagu 3',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
        {
            name: 'Lagu 4',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
        {
            name: 'Lagu 5',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
        {
            name: 'Lagu 6',
            length: 100,
            count: 100,
            path: 'path',
            albumId: 1,
            artistId: 1,
        },
    ];

    const fakeDataAlbum = [
        {
            name: 'Album 1',
            length: 100,
            artistId: 1,
        },
        {
            name: 'Album 2',
            length: 100,
            artistId: 1,
        },
        {
            name: 'Album 3',
            length: 100,
            artistId: 1,
        },
        {
            name: 'Album 4',
            length: 100,
            artistId: 1,
        },
        {
            name: 'Album 5',
            length: 100,
            artistId: 1,
        },
        {
            name: 'Album 6',
            length: 100,
            artistId: 1,
        },
    ];

    const fakeDataArtist = [
        {
            name: 'Artist 1',
        },
        {
            name: 'Artist 2',
        },
        {
            name: 'Artist 3',
        },
        {
            name: 'Artist 4',
        },
        {
            name: 'Artist 5',
        },
        {
            name: 'Artist 6',
        },
    ];

    const fakeDataGenre = [
        {
            name: 'Genre 1',
            artistId: 1,
        },
        {
            name: 'Genre 2',
            artistId: 1,
        },
        {
            name: 'Genre 3',
            artistId: 1,
        },
        {
            name: 'Genre 4',
            artistId: 1,
        },
        {
            name: 'Genre 5',
            artistId: 1,
        },
        {
            name: 'Genre 6',
            artistId: 1,
        },
    ];
    
    try {
        await sequelizeDB.sync({ force: true }).then(async () => {
            if (Artist) {
                await Artist.bulkCreate(fakeDataArtist);
            }
            if (Album) {
                await Album.bulkCreate(fakeDataAlbum);
            }
            if (Music) {
                await Music.bulkCreate(fakeDataMusic);
            }
            if (Genre) {
                await Genre.bulkCreate(fakeDataGenre);
            }
        });
    
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.log("Model does not exist");
    }
    
    
}

export const getAllDataMusic = async () => {
    const Music = (await import('../Model/Music')).default;
    const Album = (await import('../Model/Album')).default;
    const Artist = (await import('../Model/Artist')).default;
    const Genre = (await import('../Model/Genre')).default;

    try {
        const data = await Music.findAll({
            include: [
              {
                model: Artist,
                as: 'artist',
              },
            ],
          });
          
        return data;
    } catch (error) {
        console.log(error);
        return [];
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

