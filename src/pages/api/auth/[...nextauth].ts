import axios from 'axios'
import NextAuth from 'next-auth'
import { signIn, useSession } from 'next-auth/client'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  events: {
    async signIn(message) {
      const userName = message.user.name

      await axios.post('/api/create', {name: userName, image: message.user.image}, {baseURL: process.env.NEXTAUTH_URL})
    }
  }
})