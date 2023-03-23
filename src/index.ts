type SigningOption = boolean | {url: string}

interface Options {
  /** ลงนามถวายพระพร */
  signing?: SigningOption

  /** ชื่อ theme */
  theme?: ThemeKey

  /** จะ redirect ไปหน้าใหม่ไหม ถ้าไม่ redirect จะแค่ปิด overlay */
  redirectUrl?: string

  /** ข้อความปุ่มเข้าสู่เว็บไซต์ */
  enterSiteText?: string

  /** พื้นหลังเว็บไซต์ */
  backdropUrl?: string
}

interface Window {
  KingSplashScreenOptions: Options
}

type ThemeKey = 'sky' | 'yellow'

const DEFAULT_THEME: ThemeKey = 'yellow'
const DEFAULT_SIGNING_URL = 'https://wellwishes.royaloffice.th'
const DEFAULT_ENTER_SITE_TEXT = 'เข้าสู่เว็บไซต์'

const backdropByTheme: Record<ThemeKey, string> = {
  sky: 'http://www.nso.go.th/sites/2014/_catalogs/masterpage/NSO1/img/12-08/bg3.png',
  yellow:
    'https://www.parliament.go.th/intro_special_day/img/5dec/5dec52_3.png',
}

function getBackdropUrl(options: Options) {
  // ถ้า backdrop override ไว้ให้ใช้ backdrop ที่กำหนด
  if (typeof options.backdropUrl === 'string') return options.backdropUrl

  // ถ้าไม่มี backdrop ให้ใช้มาจาก theme
  return backdropByTheme[options.theme || DEFAULT_THEME]
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
    min-height: 100vh;
  }

  #king-splash-screen h1 {
		font-family: 'Sarabun', sans-serif;
		font-size: 3em;
		text-align: center;
  }

  #king-splash-screen button {
    background: #f6e58d;
		font-family: 'Sarabun', sans-serif;
  }
`

function createSigningButton(signing?: SigningOption) {
  const signingEnabled = !!signing

  const signingUrl: string =
    typeof signing === 'object' && 'url' in signing
      ? signing.url
      : DEFAULT_SIGNING_URL

  const signingEl = `<a href="${signingUrl}" target="_blank"><button>ลงนามถวายพระพร</button></a>`

  return signingEnabled ? signingEl : ''
}

function createEnterSiteButton(options: Options) {
  const shouldRedirect = !!options.redirectUrl
  const enterSiteText = options.enterSiteText ?? DEFAULT_ENTER_SITE_TEXT

  const closeOverlayEl = `<button class="enter-website" onclick="document.getElementById('king-splash-screen').remove()">${enterSiteText}</button>`

  return shouldRedirect ? `` : closeOverlayEl
}

function createKingSplashScreen(options: Options = {}) {
  const container = document.createElement('div')
  container.id = 'king-splash-screen'

  const message = `ขอพระองค์ทรงพระเจริญ`

  const backdropUrl = getBackdropUrl(options)

  container.innerHTML = `
		<div class="container" style="background-image: url('${backdropUrl}')">
			<h1 class="message">${message}</h1>

			${createSigningButton(options.signing)}
			${createEnterSiteButton(options)}

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
