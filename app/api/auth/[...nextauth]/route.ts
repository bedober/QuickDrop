import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

interface TikTokProfile {
  data?: {
    user?: {
      open_id?: string;
      union_id?: string;
      avatar_url?: string;
      display_name?: string;
    };
  };
}

function TikTokProvider<P extends TikTokProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: 'tiktok',
    name: 'TikTok',
    type: 'oauth',
    authorization: {
      url: 'https://www.tiktok.com/v2/auth/authorize/',
      params: { scope: 'user.info.basic' },
    },
    token: 'https://open.tiktokapis.com/v2/oauth/token/',
    userinfo: 'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
    client: {
      token_endpoint_auth_method: 'client_secret_post',
    },
    profile(profile) {
      const user = profile.data?.user;
      return {
        id: user?.open_id || user?.union_id || '',
        name: user?.display_name || 'QuickDrop customer',
        email: null,
        image: user?.avatar_url || null,
      };
    },
    checks: ['state'],
    ...options,
  };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_ID || '',
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return baseUrl + url;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {}
      return baseUrl + '/account';
    },
    async jwt({ token, profile, account }) {
      if (account) token.provider = account.provider;
      if (profile) token.providerProfile = profile;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
      }
      return session;
    },
  },
  pages: { signIn: '/login' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
