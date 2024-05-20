const { Favorite } = require('../DB_connection');

const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body;
    
        if(!id || !name || !origin || !image || !species || !gender){
            return res.status(401).send('Faltan datos');
        }
    
        const [favorite] = await Favorite.findOrCreate({ where: { id, name, origin, status, image, species, gender }});
        const favorites = await Favorite.findAll();
    
        return res.status(201).json(favorites);
    } catch (error) {
        alert(error.message)
        return res.status(500).send(error.message);
    }
}

module.exports = postFav;