import { AuthTokenError } from '@//services/errors/AuthTokenError'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies, destroyCookie } from 'nookies'

//if user have a token can access...
export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    //if user is authenticated, redirect to
    const cookies = parseCookies(ctx)
    const token = cookies['@nextauth.token']
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (e) {
      if (e instanceof AuthTokenError) {
        destroyCookie(ctx, '@nextauth.token')
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
    return { notFound: true }
  }
}
