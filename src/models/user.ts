import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    address: {
        city: String,
        street: String,
        number: Number,
        zipcode: String,
        geolocation: {
            lat: String,
            long: String
        }
    },
    phone: String
});

export default mongoose.model('user', userSchema);