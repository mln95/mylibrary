const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name !== null && req.query.name !== ""){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        console.log(searchOptions.name)
        const authors = await Author.find(searchOptions)
        // send all the authors from the data base to the page index. 
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Authors Route
router.get('/new', (req,res) =>{
    res.render('authors/new', { author: new Author() })
})

router.post('/', async (req, res) =>{
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            // if any error send this data to the Route new
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

module.exports = router