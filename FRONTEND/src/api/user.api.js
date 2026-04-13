import axiosInstance from "../utils/axiosInstance"

export const getUserUrls = async () => {
  const { data } = await axiosInstance.get('api/create/user/urls')
  return data
}

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post('api/auth/login', { email, password })
  return data
}

export const registerUser = async (name, email, password) => {
    const { data } = await axiosInstance.post('api/auth/register', { name, email, password })
    return data
}

export const logoutUser = async () => {
  const { data } = await axiosInstance.post('api/auth/logout')
  return data
}


export const shortenUrl = async (url, slug = null) => {
  const { data } = await axiosInstance.post('api/create/', { url, slug })
  return data
}

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('api/auth/me')
  return data
}

export const deleteUserUrl = async (id) => {
    const { data } = await axiosInstance.delete(`api/create/user/urls/${id}`)
    return data
}