import { redirect } from "@tanstack/react-router"
import { getCurrentUser } from "../api/user.api"
import { loginSuccess } from "../store/authSlice"  // ← correct import path

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context

    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      retry: false,
    })

    if (!user) throw redirect({ to: '/auth' })

    store.dispatch(loginSuccess(user))

  } catch (error) {
    throw redirect({ to: '/auth' })  // ← must use throw with redirect
  }
}