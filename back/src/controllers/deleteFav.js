const { Favorite } = require('../DB_connection');

const deleteFav = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await Favorite.destroy({
            where: {id},
            force: true,
        });

        const favs = await Favorite.findAll();
        return res.status(200).json(favs);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = deleteFav;