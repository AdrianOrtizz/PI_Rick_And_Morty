const axios = require('axios');
const URL = 'https://rym2.up.railway.app/api/character/';
const APIKEY = 'pi-adrianortizz'

const getCharById = async (req, res) => {

    try{
        const id = Number(req.params.id);
        const { data } = await axios(`${URL}${id}?key=${APIKEY}`);

        const { name, status, gender, species, origin, image } = data;
        const character = { id, name, status, gender, species, origin, image};

        if(character.name){
            return res.status(200).json(character);
        }else{
            return res.status(404).send('Not found');
        }
    }catch (error){
        return res.status(500).send(error)
    }
}

module.exports = getCharById;