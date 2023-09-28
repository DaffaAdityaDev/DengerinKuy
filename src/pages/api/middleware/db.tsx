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

    // const fakeDataMusic = [
    //     {
    //         name: 'Lagu 1',
    //         length: 100,
    //         count: 100,
    //         path: 'path',
    //         albumId: 1,
    //         artistId: 1,
    //     },

    // ];

    const fakeDataAlbum = [
        {
            name: 'Album 1',
            length: 100,
            artistId: 1,
        }
    ];

    const fakeDataArtist = [
        {
            name: 'Artist 1',
        },
    ];

    // const fakeDataGenre = [
    //     {
    //         name: 'Genre 1',
    //         artistId: 1,
    //     },
    // ];
    
    try {
        await sequelizeDB.sync({ force: true }).then(async () => { 
            if (Artist) {
                await Artist.bulkCreate(fakeDataArtist);
            }
            if (Album) {
                await Album.bulkCreate(fakeDataAlbum);
            }
            // if (Music) {
            //     await Music.bulkCreate(fakeDataMusic);
            // }
            // if (Genre) {
            //     await Genre.bulkCreate(fakeDataGenre);
            // }
        });

        // await sequelizeDB.sync({ alter: false });
    
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

    

    const result = await Music.findAll({
        include: [
            {
                model: Album,
                as: 'album',
                attributes: ['name'],
                required: true,
            },
            {
                model: Artist,
                as: 'artist',
                attributes: ['name'],
            },
        ],
    });

    return result;
    
}

export const postMusicDB = async (data: any) => {
    const Music = (await import('../Model/Music')).default;
    const Album = (await import('../Model/Album')).default;
    const Artist = (await import('../Model/Artist')).default;
    const Genre = (await import('../Model/Genre')).default;

    let { albumId, albumName, artistId, artistName, music } = data;

    // console.log("data", data);

    try {

        let CheckIsMusicExist = await Music.findOne({
            where: {
                name: music.name
            }
        })

        if (CheckIsMusicExist) {
            return Promise.reject("Music already exist")
        }

        const result = await sequelizeDB.transaction(async (t) => {
            const album = await Album.findByPk(albumId, { transaction: t });
            const artist = await Artist.findByPk(artistId, { transaction: t });

            const musicData = {
                ...data.music,
                albumId: albumId,
                artistId: artistId,
            };

            if (!album) {
                const newAlbum = await Album.create({ name: albumName }, { transaction: t });
                musicData.albumId = newAlbum.id;
            }
            
            if (!artist) {
                const newArtist = await Artist.create({ name: artistName }, { transaction: t });
                musicData.artistId = newArtist.id;
            }

            const music = await Music.create(musicData, { transaction: t });

            return { album, artist, music };
        });

        return result;
    } catch (error) {
        console.log("error", error);
        return error;
    }
};


export const checkConnection = async () => {
    try {
        await sequelizeDB.authenticate();
        console.log('Connection has been established successfully.');
        checkIfModelExists();
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

