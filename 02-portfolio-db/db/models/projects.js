import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Project Not Specified']
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'Project must have a description']
    },
    image: {
        type: String,
        unique: true,
        required: [true, 'Please include an image of the project']
    },
    technologies: {
        type: Array,
        required: [true, 'Please include the technologies used in the project']
    },
    link: {
        type: String,
        unique: true,
        required: [true, 'Please include a link to the project']
    },
    deleted: {
        type: Boolean,
        default: false
    }
})
projectSchema.plugin(mongoosePaginate);
const projectModel = mongoose.model('Projects', projectSchema);
export default projectModel;
