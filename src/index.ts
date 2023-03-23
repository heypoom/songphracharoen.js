type SigningOption = boolean | {url: string}

type ThemeKey = 'sky' | 'yellow'
type BackdropPreset = 'sky' | 'yellow'

type Theme = ThemeKey | ThemeConfig

interface Options {
  /** Optons for the book signing (ลงนามถวายพระพร) */
  signing?: SigningOption

  /** Name of the theme */
  theme?: Theme

  /** The default language */
  language?: Language

  /** The button closes the overlay by default. If the redirect url is set, it redirects to that page instead. */
  redirectUrl?: string

  /** Button for the "Enter Site" button. */
  messages?: Partial<Record<LocaleKeys, string>>
}

interface ThemeConfig {
  /** override พื้นหลังเว็บไซต์ */
  backdrop?: BackdropPreset | {url: string}
}

interface Window {
  KingSplashScreenOptions: Options
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
}

const defaultBackdropByTheme: Record<ThemeKey, BackdropPreset> = {
  sky: 'sky',
  yellow: 'yellow',
}

const getThemeBackdropUrl = (theme: ThemeKey = DEFAULT_THEME) =>
  backdropByPreset[defaultBackdropByTheme[theme]]

function getBackdropUrl({theme = DEFAULT_THEME}: Options): string {
  // Use the default backdrop from the theme.
  if (typeof theme === 'string') return getThemeBackdropUrl(theme)

  // Use the backdrop from the preset.
  if (typeof theme?.backdrop === 'string')
    return backdropByPreset[theme.backdrop]

  // Use the backdrop from the url.
  if (theme?.backdrop?.url) return theme.backdrop.url

  throw new Error('invalid theme configuration')
}

const defaultStyles = `
  #king-splash-screen {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    min-height: 100vh;

		font-family: 'Sarabun', sans-serif;
  }

  #king-splash-screen .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
		background-size: cover;
    min-height: 100vh;

		padding: 2em 2em;
  }

  #king-splash-screen h1 {
		font-family: 'Sarabun', sans-serif;
		font-size: 3em;
		text-align: center;
  }

	#king-splash-screen .button-container {
		display: flex;
		justify-content: center
		flex-wrap: wrap;
		gap: 1em;
	}

	@media (max-width: 480px) {
		#king-splash-screen h1 {
			font-size: 1.5em;
		}

		#king-splash-screen .button-container {
			flex-direction: column;
		}
	}

  #king-splash-screen button {
		cursor: pointer;
    background: #f6e58d;
		font-size: 1.2em;
		font-family: 'Sarabun', sans-serif;
		border: none;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
		padding: 0.3em 1em;
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

  const closeOverlayEl = `<button class="enter-website" onclick="document.getElementById('king-splash-screen').remove()">${enterSiteMsg}</button>`
  const redirectEl = `<a href="${options.redirectUrl}"><button class="enter-website">${enterSiteMsg}</button></a>`

  return shouldRedirect ? redirectEl : closeOverlayEl
}

function createKingSplashScreen(options: Options = {}) {
  const container = document.createElement('div')
  container.id = 'king-splash-screen'

  const wishMessage = locale('wishMessage', options)
  const backdropUrl = getBackdropUrl(options)

  container.innerHTML = `
		<div class="container" style="background-image: url('${backdropUrl}')">
			<h1 class="message">${wishMessage}</h1>

			<div class="button-container">
				${createSigningButton(options)}
				${createEnterSiteButton(options)}
			</div>

			<style>
				${defaultStyles}
			</style>
		</div>
	`

  document.body.appendChild(container)
}

if (typeof window !== 'undefined') {
  window.KingSplashScreenOptions = {
    signing: false,
  }
}

// Run the createSplashScreen function once the DOM element is mounted.
document.addEventListener('DOMContentLoaded', () => {
  const options = window.KingSplashScreenOptions || {}

  createKingSplashScreen(options)
})
