const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema


const coasterSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type:String
    },
    inversions: {
        type: Number
    },
    length: {
        type: String
    },
    active: {
        type: Boolean
    },
    park: [{type: Schema.Types.ObjectId, ref: 'Park'}]

},{timestamps: true})

module.exports = mongoose.model('Coaster', coasterSchema)