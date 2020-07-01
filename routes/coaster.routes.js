const express = require('express')
const router = express.Router()

const Coaster = require('./../models/coaster.model')
const Park = require('./../models/park.model')


//RUTAS GET <===============

router.get('/new', (req, res) => {
    //res.render('coasters/new-coaster')
    Park
        .find()
        .then(allParks => {
            res.render('coasters/new-coaster', { allParks })
        })
        .catch(err => console.log("Error en la BBDD", err))

})



router.get('/', (req, res) => {
    Coaster
        .find()
        .populate('park')
        .then(allCoasters => {
            res.render('coasters/coasters-index', { allCoasters })
        })
        .catch(err => console.log("Error en la BBDD", err))
})

router.get('/:id', (req, res) => {
    Coaster
        .findById(req.params.id)
        .populate('park')
        .then(theCoaster => {
            res.render('coasters/coaster-details', { theCoaster })


        })
        .catch(err => console.log("Error en la BBDD", err))
})
router.get('/delete/:id', (req, res) => {
    Coaster
        .findByIdAndRemove(req.params.id)
        .then(res.redirect('/coasters'))
        .catch(err => console.log("Error en la BBDD", err))
})

router.get('/edit/:id', (req, res) => {

    Promise.all([Park.find(), Coaster.findById(req.params.id)])
        .then(values => {
            console.log (values[0])
            res.render('coasters/coaster-edit', {thePark:values[0], theCoaster: values[1]})
        })
    
    // Coaster.findById(req.params.id)
        
    //     .then(theCoaster => {
    //         res.render('coasters/coaster-edit', { theCoaster })
    //     })
    //     .catch(err => console.log("Error en la BBDD", err))
   
    
})

//RUTAS POST <==============    
router.post('/new', (req, res) => {
    const { name, description, inversions, length, park } = req.body

    Coaster
        .create({ name, description, inversions, length, park })
        .then(res.redirect('/coasters/new'))
        .catch(err => console.log("Error en la BBDD", err))
})


router.post('/edit/:id', (req, res) => {
    const { name, description, inversions, length, park } = req.body
    Coaster
        .findByIdAndUpdate(req.params.id, { name, description, inversions, length, park })
        .then(res.redirect('/coasters'))
        .catch(err => console.log("Error en la BBDD", err))
})



// Aquí los endpoints


module.exports = router