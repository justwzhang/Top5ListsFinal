const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerUser: {type: String, require: true},
        date: { type: [Number], required: true},
        views: { type: Number, required: true},
        likes: { type: Number, required: true},
        dislikes: { type: Number, required: true},
        published: { type: Boolean, required: true},
        peopleLiked : { type: [String], required: true },
        peopleDisliked :{ type: [String], required: true },
        comments: {type: [(String, String)], required: true}


    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
