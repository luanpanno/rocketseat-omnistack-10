const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// O Controller geralmente tem 5 funções
// Index = Quando quero mostrar uma lista desse recurso
// Show = Quando quero mostrar um único 
// Store = Criar 
// Update = Alterar
// Destroy = Deletar

module.exports = {
    async index(request, response){
        const devs = await Dev.find()
        
        return response.json(devs)
    },
    
    async store (request, response){
        const { github_username, techs, latitude, longitude } = request.body
        
        let dev = await Dev.findOne({ github_username })
        
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            
            const { name = login, avatar_url, bio } = apiResponse.data
            
            const techsArray = parseStringAsArray(techs)
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // filtrar as conexões que estão há no máximo 10km de distância e que o novo dev tenha umas das techs filtradas

            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
        //console.log(name, avatar_url, bio, github_username, techs)
        
        return response.json(dev)
    }
}