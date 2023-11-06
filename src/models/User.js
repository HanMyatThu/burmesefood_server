import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('This value should be email format')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('Password is invalid')
            }
        }
    },
    country: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: String
    }
    ]
},{
    timestamps: true
})

UserSchema.statics.findUserByCredentials = async (email,password) => {
    const user = await User.findOne({email: email });
    if(!user) {
        throw new Error('User not found')
    }
    const isPasswordCorrect = await bcrypt.compareSync(password,user.password)
    if(!isPasswordCorrect) {
        throw new Error('password is wrong')
    }
    return user;
}

// jwt instance method , object ko access ma ya woo
UserSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({ _id : user._id.toString() }, process.env.SECRET_KEY,{ expiresIn : '1h'})

    user.tokens = user.tokens.concat({
        token
    })
    await user.save();

    return token
}


UserSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('users', UserSchema);

export default User;