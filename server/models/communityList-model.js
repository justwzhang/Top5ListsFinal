const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        votes: { type:[Number], required: true},
        date: { type: [Number], required: true},
        views: { type: Number, required: true},
        likes: { type: Number, required: true},
        dislikes: { type: Number, required: true},
        peopleLiked : { type: [String], required: true },
        peopleDisliked :{ type: [String], required: true },
        commentsUser: {type: [ String], required: true},
        commentsString: {type: [ String], required: true}

    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)