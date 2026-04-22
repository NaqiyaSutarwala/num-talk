import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { ENV } from "../../config/env";
import { ApiError } from "../../utils/ApiError";

export const register = async (username: string, password: string) => {
    const exists = await User.findOne({ username });
    if (exists) throw new ApiError(400, "User already exists");

    const hash = await bcrypt.hash(password, 10);
    return User.create({ username, password: hash });
};

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) throw new ApiError(404, "User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET);

    return { user, token };
};