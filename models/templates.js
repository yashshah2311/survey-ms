const mongoose = require('mongoose')
const { autoIncrement } = require('mongoose-plugin-autoinc')
const bcrypt=require('bcrypt')
require('mongoose-long')(mongoose)
const Schema = mongoose.Schema;

const templateSchema = new mongoose.Schema({
    is_delete: {
        type: Boolean,
        required: false,
        default: false
    },
    templateid: {
        type: Number,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    formHeading: {
        type: String,
        required: false
    },
    formColor: {
        type: String,
        required: true,
        default: "default"
    },
    formDetails: {
        type: Array,
        required: false,
        default: []
    }
},
    {
        collection: 'templates'
    });

templateSchema.plugin(autoIncrement, {
    model: 'templates',
    field: 'templateid',
    startAt: 1
});

module.exports = mongoose.model('templates', templateSchema)