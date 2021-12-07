const CommunityList = require('../models/communityList-model');

createCommunityList = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a community List',
        })
    }

    const communityList = new CommunityList(body);
    console.log("creating communityList: " + JSON.stringify(communityList));
    if (!communityList) {
        return res.status(400).json({ success: false, error: err })
    }

    communityList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                communityList: communityList,
                message: 'community List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'community List Not Created!'
            })
        })
}

updateCommunityList = async (req, res) => {
    const body = req.body
    console.log("updatecommunityList: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("communityList found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'community List not found!',
            })
        }

        communityList.name = body.name
        communityList.date = body.date
        communityList.items = body.items
        communityList.votes = body.votes
        communityList.peopleLiked = body.peopleLiked
        communityList.peopleDisliked = body.peopleDisliked
        communityList.commentsUser = body.commentsUser
        communityList.commentsString = body.commentsString
        communityList.views = body.views
        communityList.likes = body.likes
        communityList.dislikes = body.dislikes
        communityList.save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'community List not updated!',
                })
            })
    })
}

deleteCommunityList = async (req, res) => {
    CommunityList.findById({ _id: req.params.id }, (err, communityList) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'community List not found!',
            })
        }
        CommunityList.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: communityList })
        }).catch(err => console.log(err))
    })
}

getCommunityListById = async (req, res) => {
    await CommunityList.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, communityList: list })
    }).catch(err => console.log(err))
}
getCommunityLists = async (req, res) => {
    await CommunityList.find({}, (err, communityLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityLists.length) {
            return res
                .status(404)
                .json({ success: false, error: `community Lists not found` })
        }
        return res.status(200).json({ success: true, data: communityLists })
    }).catch(err => console.log(err))
}
getCommunityListPairs = async (req, res) => {
    await CommunityList.find({ }, (err, communityLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityLists) {
            console.log("!communityLists.length");
            return res
                .status(404)
                .json({ success: false, error: 'community Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in communityLists) {
                let list = communityLists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createCommunityList,
    updateCommunityList,
    deleteCommunityList,
    getCommunityLists,
    getCommunityListPairs,
    getCommunityListById
}