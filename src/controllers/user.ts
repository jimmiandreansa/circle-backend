import { Request, Response } from "express";
import * as userService from "../services/user"

export const register = async (req: Request, res: Response) => {
  try {
    const {body} = req

    await userService.register(body)

    res.json({
      status: true,
      message: "success"
    })
  } catch (error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const login = async (req : Request, res : Response) => {
  try {
    const {username, password} = req.body
    const token = await userService.login(username, password)

    res.json({
      status: true,
      message: "success",
      data: token
    })
  } catch (error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const check = async (req: Request, res: Response) => {
  try {
    const loginSession = res.locals.loginSession
    const response = await userService.check(loginSession);

    console.log("ini response", response)

    res.json({
      status: true,
      message: "success",
      data: response
    })
  } catch (error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const users = await userService.getUsers(userId)

    res.json({
      status: true,
      message: "success",
      data: users
    })
  } catch (error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const searchUser = async (req: Request, res: Response) => {
  try {
    const {query} = req.query

    const userResult = await userService.searchUsers(query as string)

    res.json({
      status:true,
      message: "success",
      data: userResult
    })
  }catch(error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const getUserDetail = async (req: Request, res: Response) => {
  try{
    const {userId} = req.params

    const userResult = await userService.getUserDetail(+userId)

    res.json({
      status:true,
      message: "success",
      data: userResult
    })
  }catch (error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const getUserSuggest = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;

    const users = await userService.getUserSuggest(userId)

    res.json({
      status: true,
      message: "success",
      data: users
    })
  } catch(error) {
    const err = error as unknown as Error
    console.log(err)

    res.status(500).json({
      status: false,
      message: err.message
    })
  }
  }
