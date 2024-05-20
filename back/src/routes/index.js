const getCharbyId = require('../controllers/getCharById');
const login = require('../controllers/login');
const deleteFav = require('../controllers/deleteFav');
const postFav = require('../controllers/postFav');
const postUser = require('../controllers/postUser');
const getAllFavs = require('../controllers/getAllFavs');

const { Router } = require('express');

const router = Router();

router.get('/character/:id', getCharbyId);
router.get('/login', login);
router.get('/fav',getAllFavs)

router.post('/login', postUser);
router.post('/fav', postFav);

router.delete('/fav/:id', deleteFav);

module.exports = router;