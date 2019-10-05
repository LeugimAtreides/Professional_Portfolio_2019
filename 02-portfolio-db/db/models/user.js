import mongoose from 'mongoose';
import shortid from 'shortid';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    isMe: Boolean,
    VisitorKey: {
        'type': String,
        'default': shortid.generate
    }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;