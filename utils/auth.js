import redirect from './redirect'
import { getCookie, removeCookie } from './session'

const getCookieSessionName = () => {
  return 'mmdbsessionid'
}

/*
export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie(getCookieSessionName())
    redirect('/', ctx)
  }
}

export const getAuthToken = ctx => {
  return getCookie(getCookieSessionName(), ctx.req)
}

export const isAuthenticated = ctx => !!getAuthToken(ctx)

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx)
    return true
  }
  return false
}

export const redirectIfNotAuthenticated = ctx => {
  // NatGeo's cookie is not available on browser
  // Therefore redirect only on Server Side
  if (!process.browser && !isAuthenticated(ctx)) {
    redirect('/', ctx)
    return true
  }
  return false
}
*/
