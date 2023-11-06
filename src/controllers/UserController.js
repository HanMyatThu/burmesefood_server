import User from '../models/User.js'
import { ResponseResource } from '../Resources/ResponseResource.js';

export const RegisterUser = async (req,res) => {
  const data = req.body;
  try {
    const isUserExisted = await User.findOne({ email: data.email })
    if(isUserExisted) {
      ResponseResource(res,400,'User with this email is already created',null)
    }
    const user = await User.create(data);
    await user.save()
    ResponseResource(res,201,null,{user})
  } catch(e) {
    ResponseResource(res,500,'Something is wrong. Please try again',null)
  }
}

export const LoginUser = async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email,password)
    if(!user.isVerified) {
      return ResponseResource(res,400,'User is not verified',null)
    }
    const token =  await user.generateAuthToken()
    ResponseResource(res,200,null, {
      user,
      accessToken: token
    })
  } catch(e) {
    ResponseResource(res,500,'Something is wrong. Please try again',null)
  }
}

export const VerifyUser = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isVerified = true;
    await user.save()
    ResponseResource(res,200,null, {
      message: "User is Verified"
    })
  } catch(e) {
    ResponseResource(res,500,'Something is wrong. Please try again',null)
  }
}

export const UserLogout = async(req,res) => {
  try {
    const user = req.user;
    const token = req.token;
    user.tokens = user.tokens.filter(tok => tok.token !== token)
    await user.save()
    ResponseResource(res,200,null, {
      message: 'User is logout successfully',
      user
    })
  } catch(e) {
    ResponseResource(res,500,'Something is wrong. Please try again',null)
  }
}