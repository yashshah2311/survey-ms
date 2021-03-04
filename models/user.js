const mongoose = require('mongoose')
const { autoIncrement } = require('mongoose-plugin-autoinc')
const bcrypt=require('bcrypt')

require('mongoose-long')(mongoose)
const Schema = mongoose.Schema;

const schema = new Schema({
    is_delete: {
        type: Boolean,
        required: false,
        default: false
    },
    userid: {
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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        // length: 10,
        require: true
    }
},
    {
        collection: 'user'
    });
schema.pre('save', async function save(next) {
    let self = this;
    try {
        if (!this.isModified('password')) return next();
        const rounds = 10;
        const hash = await bcrypt.hash(this.password, rounds);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});

schema.plugin(autoIncrement, {
    model: 'user',
    field: 'userid',
    startAt: 1
});

module.exports = mongoose.model('user', schema)
