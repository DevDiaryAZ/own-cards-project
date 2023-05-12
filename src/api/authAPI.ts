import axios, { AxiosResponse } from 'axios'

import { forgotTC } from '../store/authReducer'

import { instance } from './instance'

import { TResponseAuthData } from 'types/types'

// AUTH API
export const authAPI = {
  authMe() {
    return instance.post<{}, AxiosResponse<TResponseAuthData>>('/auth/me')
  },
  registration(email: string, password: string) {
    return instance.post<
      {
        email: string
        password: string
      },
      AxiosResponse<TResponseAuthData>
    >('/auth/register', {
      email,
      password,
    })
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<
      {
        email: string
        password: string
        rememberMe: boolean
      },
      AxiosResponse<TResponseAuthData>
    >('/auth/login', {
      email,
      password,
      rememberMe,
    })
  },
  changeName(newName: string) {
    return instance.put<
      {
        name: string
      },
      AxiosResponse<TResponseAuthData>
    >('/auth/me', {
      name: newName,
    })
  },
  changeAvatar() {
    return instance.put<
      {
        avatar: string // url or base64
      },
      AxiosResponse<TResponseAuthData>
    >('/auth/me', {
      avatar: 'https//avatar-url.img', // url or base64
    })
  },
  logout() {
    return instance.delete<{}, AxiosResponse<TResponseAuthData>>('/auth/me')
  },
  forgot(email: string) {
    let data = {
      email,
      message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
    }

    return axios
      .create({
        baseURL: 'https://neko-back.herokuapp.com/2.0',
        withCredentials: true,
      })
      .post<
        {
          email: string
          message: string
        },
        AxiosResponse<TResponseAuthData>
      >('/auth/forgot', data)
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return axios
      .create({
        baseURL: 'https://neko-back.herokuapp.com/2.0',
        withCredentials: true,
      })
      .post<
        {
          password: string
          resetPasswordToken: string
        },
        AxiosResponse<TResponseAuthData>
      >('/auth/set-new-password', {
        password,
        resetPasswordToken,
      })
  },
}
