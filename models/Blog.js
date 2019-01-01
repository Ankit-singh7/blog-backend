//importing mongoose module
const mongoose = require('mongoose');
const time = require('./../libs/timeLib');

//import schema
//we use schema to define how our structure is 
//going to look like

const Schema = mongoose.Schema;

let blogSchema = new Schema(


    {
        blogId: {
            type: String,
            unique: true
        },
        type: {
            type: String,
            default: '' //this key is to hold a default title
        },
        description: {
            type: String,
            default: ''
        },
        bodyHtml: {
            type: String,
            default: ''

        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: false
        },
        author: {
            type: String,
            default: ''

        },
        tags: [],
        created: {
            type: Date,
            default: Date.now
        },
        lastModified: {
            type: Date,
            default: Date.now
        }

    }

)

mongoose.model('Blog',blogSchema);