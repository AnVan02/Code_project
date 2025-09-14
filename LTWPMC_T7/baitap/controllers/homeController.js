var express = require('express');
var router = express.Router();

// const createCollection = require('../service/createCollection');
let Pokemons = require ('../data/pokemonData');
console.log(Pokemons)

const getHomePage = (req,res,next) =>{
     res.render('index.ejs',{Pokemons});

}
const getAllPokemon = (req,res,next)=>{

}



module.exports ={
     getHomePage,getAllPokemon
}
