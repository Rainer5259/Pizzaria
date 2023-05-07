import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

//can only be accessed by visitant
export function canSSRguess<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    //if user is authenticated, redirect to
    const cookies = parseCookies(ctx)

    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/category',
          permanent: false
        }
      }
    }
    return await fn(ctx)
  }
}
