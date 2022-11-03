import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.js";
import sendError from "../utils/sendError.js";
import sendSuccess from "../utils/sendSuccess.js";

export const registerController = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email) return sendError(res, "Vui lòng nhập email!");
  if (!validator.isEmail(email)) return sendError(res, "Email không hợp lệ!");

  if (!password) return sendError(res, "Vui lòng nhập mật khẩu!");
  if (password.length < 8)
    return sendError(res, "Mật khẩu phải có ít nhất 8 ký tự!");
  if (!confirmPassword) return sendError(res, "Vui lòng xác nhận mật khẩu!");
  if (password !== confirmPassword)
    return sendError(res, "Mật khẩu và xác nhận mật khẩu không khớp!");

  try {
    const isExist = await User.exists({ email });
    if (isExist) return sendError(res, "Người dùng đã tồn tại!");

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    return sendSuccess(res, "Đăng ký thành công!");
  } catch (error) {
    return next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Vui lòng nhập email!");
  if (!validator.isEmail(email)) return sendError(res, "Email không hợp lệ!");

  if (!req.body.password) return sendError(res, "Vui lòng nhập mật khẩu!");
  if (req.body.password.length < 8)
    return sendError(res, "Mật khẩu phải có ít nhất 8 ký tự!");

  try {
    const isExist = await User.exists({ email });
    if (!isExist) return sendError(res, "Người dùng không tồn tại!", 404);

    const user = await User.findOne({ email });

    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return sendError(res, "Sai mật khẩu!");

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const { password, updatedAt, __v, ...data } = user._doc;

    return sendSuccess(
      res.cookie("access_token", token, {
        httpOnly: true,
      }),
      "Đăng nhập thành công!",
      data
    );
  } catch (error) {
    return next(error);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email) return sendError(res, "Vui lòng nhập email!");
  if (!validator.isEmail(email)) return sendError(res, "Email không hợp lệ!");

  if (!password) return sendError(res, "Vui lòng nhập mật khẩu!");
  if (!confirmPassword)
    return sendError(res, "Vui lòng xác nhận lại mật khẩu!");
  if (password.length < 8)
    return sendError(res, "Mật khẩu phải có ít nhất 8 ký tự!");
  if (password !== confirmPassword)
    return sendError(res, "Mật khẩu và xác nhận mật khẩu không khớp!");

  try {
    const isExist = await User.exists({ email });
    if (!isExist) return sendError(res, "Người dùng không tồn tại!", 404);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    await User.findOneAndUpdate({ email }, { password: hash });

    return sendSuccess(res, "Thay đổi mật khẩu thành công!");
  } catch (error) {
    return next(error);
  }
};
