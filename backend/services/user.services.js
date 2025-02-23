import userModel from "../model/user.model.js"

export const createUser = async ({email,password}) => {
    if(!email || !password) {
        throw new Error("required email or password")
    }

    const hashPassword = await userModel.hashPassword(password);
    const user = await userModel.create(
        { email,
         password: hashPassword
        });
    return user;
}
