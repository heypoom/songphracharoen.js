declare global {
  interface Window {
    RoyalSplashScreenOptions: Options
  }
}

type SigningOption = boolean | {url: string}

type ThemeKey = 'sky' | 'yellow'
type BackdropPreset = 'sky' | 'yellow' | 'blue'

interface Options {
  /** Options for the book signing (ลงนามถวายพระพร) */
  signing?: SigningOption

  /** Base theme. */
  theme?: ThemeKey

  /** Theme overrides. */
  themeSettings?: ThemeConfig

  /** The default language */
  language?: Language

  /** The button closes the overlay by default. If the redirect url is set, it redirects to that page instead. */
  redirectUrl?: string

  /** Button for the "Enter Site" button. */
  messages?: Partial<Record<LocaleKeys, string>>

  /** Applies a greyscale filter with a grey theme to mourn the deceased royal family member. */
  mourning?: boolean
}

export type RoyalSplashScreenOptions = Options

interface ThemeConfig {
  backdrop: BackdropPreset | {url: string}

  heroImageUrl: string

  primaryBtn: {
    bg: string
    color: string

    hover: {
      bg: string
      color: string
    }
  }
}

type Language = 'en' | 'th'

const DEFAULT_THEME: ThemeKey = 'yellow'
const DEFAULT_SIGNING_URL = 'https://wellwishes.royaloffice.th'
const DEFAULT_LANGUAGE: Language = 'th'

type LocaleKeys = 'enterSiteBtn' | 'signBtn' | 'wishMessage'
type Translations = Record<LocaleKeys, Record<Language, string>>

const defaultTranslations: Translations = {
  wishMessage: {
    en: 'Long Live the King',
    th: 'ขอพระองค์ทรงพระเจริญ',
  },
  enterSiteBtn: {
    en: 'Enter Site',
    th: 'เข้าสู่เว็บไซต์',
  },
  signBtn: {
    en: 'Sign a congratulatory book',
    th: 'ลงนามถวายพระพร',
  },
}

function locale(key: LocaleKeys, options: Options) {
  const language = options.language ?? DEFAULT_LANGUAGE

  return options.messages?.[key] ?? defaultTranslations[key][language]
}

const backdropByPreset: Record<BackdropPreset, string> = {
  sky: 'http://www.nso.go.th/sites/2014/_catalogs/masterpage/NSO1/img/12-08/bg3.png',
  yellow:
    'https://www-live.pptvhd36.com/images/campaigns/coronation/bg-pc.jpg?1679566561-cdn',
  blue: 'https://i.pinimg.com/originals/4f/09/22/4f092248497eb1b89b2d83020d4621ed.jpg',
}

const heroImages = {
  queen99:
    'http://www.nso.go.th/sites/2014/_catalogs/masterpage/NSO1/img/12-08/pic_Queen999.png',
  tpjr1:
    'http://www.nso.go.th/sites/2014/_catalogs/masterpage/NSO1/img/12-08/text12-8.png',
  oBasic: 'http://www.srinonngam.go.th/upload/images/20190205070854.jpg',
  oTall: 'https://bizid.egov.go.th/CoverPage/images/intro-king-10-02.jpg',
}

const themes: Record<ThemeKey, ThemeConfig> = {
  sky: {
    backdrop: 'sky',
    heroImageUrl: heroImages.tpjr1,
    primaryBtn: {
      bg: '#007bff',
      color: 'white',
      hover: {
        bg: '#0069d9',
        color: 'white',
      },
    },
  },
  yellow: {
    backdrop: 'yellow',
    heroImageUrl: heroImages.oTall,
    primaryBtn: {
      bg: '#f6e58d',
      color: 'black',
      hover: {
        bg: '#f9ca24',
        color: 'black',
      },
    },
  },
}

const getTheme = (options: Options): ThemeConfig => ({
  ...themes[options.theme ?? DEFAULT_THEME],
  ...options.themeSettings,
})

function getBackdropUrl(options: Options): string {
  const theme = getTheme(options)

  // Use the backdrop from the theme.
  if (typeof theme.backdrop === 'string')
    return backdropByPreset[theme.backdrop]

  // Use the backdrop from the url.
  if (theme?.backdrop?.url) return theme.backdrop.url

  throw new Error('invalid theme configuration')
}

const defaultStyles = `
  #royal-splash-screen {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    min-height: 100vh;

		font-family: 'Sarabun', sans-serif;
  }

  #royal-splash-screen .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
		background-size: cover;
    min-height: 100vh;

		padding: 2em 2em;
  }

	#royal-splash-screen .container img {
    max-height: 500px;
		max-width: 100%;
	}

  #royal-splash-screen h1 {
		font-family: 'Sarabun', sans-serif;
		font-size: 3em;
		text-align: center;
  }

	#royal-splash-screen .button-container {
		display: flex;
		justify-content: center
		flex-wrap: wrap;
		gap: 1em;
	}

	@media (max-width: 480px) {
		#royal-splash-screen h1 {
			font-size: 1.5em;
		}

		#royal-splash-screen .button-container {
			flex-direction: column;
		}
	}

  #royal-splash-screen button {
		cursor: pointer;
		font-size: 1.2em;
		font-family: 'Sarabun', sans-serif;
		border: none;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
		padding: 0.3em 1em;
  }
`

const mourningStyle = `
#royal-splash-screen * {
	filter: grayscale(100%);
}
`

function createSigningButton(options: Options) {
  const {signing} = options
  const signingEnabled = !!signing

  const signingUrl: string =
    typeof signing === 'object' && 'url' in signing
      ? signing.url
      : DEFAULT_SIGNING_URL

  const signingEl = `<a href="${signingUrl}" target="_blank">
		<button>${locale('signBtn', options)}</button>
	</a>`

  return signingEnabled ? signingEl : ''
}

function createEnterSiteButton(options: Options) {
  const shouldRedirect = !!options.redirectUrl
  const enterSiteMsg = locale('enterSiteBtn', options)

  const closeOverlayEl = `<button class="enter-website" onclick="document.getElementById('royal-splash-screen').remove()">${enterSiteMsg}</button>`
  const redirectEl = `<a href="${options.redirectUrl}"><button class="enter-website">${enterSiteMsg}</button></a>`

  return shouldRedirect ? redirectEl : closeOverlayEl
}

function createRoyalSplashScreen(options: Options = {}) {
  const container = document.createElement('div')
  container.id = 'royal-splash-screen'

  const wishMessage = locale('wishMessage', options)
  const backdropUrl = getBackdropUrl(options)
  const theme = getTheme(options)

  container.innerHTML = `
		<div class="container" style="background-image: url('${backdropUrl}')">
			<img src="${theme.heroImageUrl}" alt="hero image">

			<h1 class="message">${wishMessage}</h1>

			<div class="button-container">
				${createSigningButton(options)}
				${createEnterSiteButton(options)}
			</div>

			<style>
				${defaultStyles}
				${options.mourning ? mourningStyle : ''}

				#royal-splash-screen button {
					color: ${theme.primaryBtn?.color};
					background: ${theme.primaryBtn?.bg};
				}

				#royal-splash-screen button:hover {
					color: ${theme.primaryBtn?.hover?.color};
					background: ${theme.primaryBtn?.hover?.bg};
					scale: 1.05;
					transition: 0.2s ease-in-out all;
				}
			</style>
		</div>
	`

  document.body.appendChild(container)
}

if (typeof window !== 'undefined') {
  window.RoyalSplashScreenOptions = {
    signing: false,
  }
}

// Run the createSplashScreen function once the DOM element is mounted.
document.addEventListener('DOMContentLoaded', () => {
  const options = window.RoyalSplashScreenOptions || {}

  createRoyalSplashScreen(options)
})
