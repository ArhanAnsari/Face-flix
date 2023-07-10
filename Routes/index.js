
const express = require("express");

const router = express.Router();
const { ensureAuthenticated } = require("../Config/auth");
const Emotion=require("../Models/Emotion");









router.get('/', (req, res) => {
   
    
   let error_msg="";
    if (req.isAuthenticated()) {

        res.render("index", { name: Object.prototype.toString.call(req.user.name) === '[object Object]' ? req.user.displayName : req.user.name });
        return;

    }
    else {
        res.render("signin",{error_msg});
        return;
    }

})



router.get('/movies', ensureAuthenticated, (req, res) => {
   

    res.render("movies", { name: Object.prototype.toString.call(req.user.name) === '[object Object]' ? req.user.displayName : req.user.name });

});

router.get('/webcam', ensureAuthenticated, (req, res) => {
    res.render("webcam");
})




router.post("/movies2", ensureAuthenticated, async(req, res) => {


    console.log(req.body.myemotion);
    var genres = [

        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }

    ];
    if(req.body.myemotion=='happy'||req.body.myemotion=='sad'||req.body.myemotion=='angry'||req.body.myemotion=='fear'||req.body.myemotion=='disgust'||req.body.myemotion=='surprise'||req.body.myemotion=='neutral'){
        var results=await Emotion.findOne({emotion:req.body.myemotion})
        
        genres=results.genres;
    }
    
    
    
    res.render("movies2", { genres,  name: Object.prototype.toString.call(req.user.name) === '[object Object]' ? req.user.displayName : req.user.name });
})



router.get("/movies2", ensureAuthenticated, (req, res) => {
    res.redirect("/movies");
})

// MOVIES LINK FROM INDEX PAGE
router.get("/movies3/:type", ensureAuthenticated, (req, res) => {

    let type = req.params.type;
    var filtergenere = [

        {
            "id": 28,
            "name": "Action"
        },


        {
            "id": 35,
            "name": "Comedy"
        },



        {
            "id": 18,
            "name": "Drama"
        },

        {
            "id": 14,
            "name": "Fantasy"
        },

        {
            "id": 27,
            "name": "Horror"
        },

        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 10402,
            "name": "Music"
        },


    ]
   
    var genres = filtergenere;

    filtergenere.forEach((genre) => {
        if (genre.name == type) {
            genres = [];
            genres.push(genre);

        }
    })
    res.render("movies2", {  genres, name: Object.prototype.toString.call(req.user.name) === '[object Object]' ? req.user.displayName : req.user.name });
    return;



})







module.exports = router;

