import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false,
        default: function() {
            return getGravatarUrl(this.email);
        },
    },
});

// Hash password before saving
// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});
// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

function getGravatarUrl(email) {
    const hash = crypto
        .createHash('md5')
        .update(email.trim().toLowerCase())
        .digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}

const User = mongoose.model('User', userSchema);
export default User;