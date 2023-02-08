import { defineConfig } from 'cypress'
import socialLogin from 'cypress-social-logins'

const googleSocialLogin = socialLogin.plugins.GoogleSocialLogin

export default defineConfig({
  e2e: {
    env: {
      GOOGLE_USER: 'louismsankey@gmail.com',
      GOOGLE_PW: 'Loonstar1',
      COOKIE_NAME: 'next-auth.session-token',
      SITE_NAME: 'http://localhost:3000',
      GOOGLE_CLIENT_ID:
        '135427563097-gco1a99g49luj4pk849h9oeei3ubcu1q.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: 'D4RiMGfSgr7tbB3NhcRkrHW3rW4K',
      GOOGLE_REFRESH_TOKEN:
        '1//04li-SdrHfjNyCgYIARAAGAQSNwF-L9IrJZkIpJn2ssHRm-wA5oOkafrH7tFQ2u4wUGETY5hZVGduaG_9OMvUIXEpduHQWNAhJiU'
    },
    setupNodeEvents(on, config) {
      on('task', {
        GoogleSocialLogin: googleSocialLogin
      })
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    watchForFileChanges: true
  }
})
