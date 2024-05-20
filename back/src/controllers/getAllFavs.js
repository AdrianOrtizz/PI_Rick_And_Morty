const { Favorite } = require('../DB_connection');

const getAllFavs = async (req, res) => {
    try {
        const favs = await Favorite.findAll();
        console.log(favs);
        return res.status(200).json(favs);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getAllFavs;