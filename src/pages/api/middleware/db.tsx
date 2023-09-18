import { Sequelize } from 'sequelize';
import { Music } from '../model/Music';
import { Genre } from '../model/Genre';
import { Artist } from '../model/Artist';
import { Album } from '../model/Album';

export const sequelizeDB = new Sequelize('dengerinkuy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const checkIfModelExists = async () => {
    try {
        // Check if the table already exists in the database
        const tableExistsMusic = await Music.sync({ alter: false });
        const tableExistsGenre = await Genre.sync({ alter: false });
        const tableExistsArtist = await Artist.sync({ alter: false });
        const tableExistsAlbum = await Album.sync({ alter: false });
        
        const joinTableISExists = [...tableExistsMusic, ...tableExistsGenre, ...tableExistsArtist, ...tableExistsAlbum]

        for (let i = 0; i < joinTableISExists.length; i++) {
            const element = joinTableISExists[i];
            if (element) {
                console.log("Table exists");
            } else {
                console.log("Table does not exist Loop");
            }


        }
        
    } catch (error) {
        console.log("Model does not exist");
    }
}

export const checkConnection = async () => {
    try {
        await sequelizeDB.authenticate();
        console.log('Connection has been established successfully.');
        await checkIfModelExists();
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}


export const deleteAllTable = async () => {
    try {
        await sequelizeDB.drop();
        console.log('All table has been deleted successfully.');
    } catch (error) {
        console.log('Unable to delete all table:', error);
    }
}