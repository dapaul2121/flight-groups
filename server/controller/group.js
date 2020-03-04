const Group = require('../../db/index')
const mongoose = require('mongoose')

const postGroup = (req, res) => {
    Group.insertMany([req.body], (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else {
            res.send(data)
        }

    });

}

const getAllGroups = (req, res) => {
    console.log('get all group runs')
    Group.find({}, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(404)
        } else {
            res.send(data)
        }
    })
}

const patchGroupMember = (req, res) => {
    const id = req.params.groupId
    const newMember = req.body.newMember
    const group = req.body.group
    group.members.push(newMember)
    Group.findByIdAndUpdate({_id: id}, { $set: {members: group.members}}, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else {
            res.send(data)
        }
    });
}

module.exports.postGroup = postGroup
module.exports.getAllGroups = getAllGroups
module.exports.patchGroupMember = patchGroupMember