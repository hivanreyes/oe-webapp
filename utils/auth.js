import redirect from './redirect'
import { getCookie, removeCookie } from './session'

const getCookieSessionName = dev => `mmdbsessionid${dev ? '-stg' : ''}`

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie(getCookieSessionName(process.env.NODE_ENV !== 'production'))
    redirect('/', ctx)
  }
}

export const getAuthToken = (ctx = { req: null }) => {
  const cookieName = getCookieSessionName(process.env.NODE_ENV !== 'production')
  return getCookie(cookieName, ctx.req)
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
