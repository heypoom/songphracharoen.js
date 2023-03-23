interface KingSplashScreenOptions {
  /** ลงนามถวายพระพร */
  signing?: SigningOption

  /** จะ redirect ไปหน้าใหม่ไหม ถ้าไม่ redirect จะแค่ปิด overlay */
  redirectUrl?: string

  /** ข้อความปุ่มเข้าสู่เว็บไซต์ */
  enterSiteText?: string
}

type SigningOption = boolean | {url: string}

interface Window {
  KingSplashScreenOptions: KingSplashScreenOptions
}

const DEFAULT_SIGNING_URL = 'https://wellwishes.royaloffice.th'

function createSigningButton(signing?: SigningOption) {
  const signingEnabled = !!signing

  const signingUrl: string =
    typeof signing === 'object' && 'url' in signing
      ? signing.url
      : DEFAULT_SIGNING_URL

  const signingEl = `<a href="${signingUrl}"><button>ลงนามถวายพระพร</button></a>`

  return signingEnabled ? signingEl : ''
}

function createEnterSiteButton(options: KingSplashScreenOptions) {
  const shouldRedirect = !!options.redirectUrl
  const enterSiteText = options.enterSiteText ?? 'เข้าสู่เว็บไซต์'

  const closeOverlayEl = `<button class="enter-website" onclick="document.getElementById('king-splash-screen').remove()">${enterSiteText}</button>`

  return shouldRedirect ? `` : closeOverlayEl
}

function createKingSplashScreen(options: KingSplashScreenOptions = {}) {
  const container = document.createElement('div')
  container.id = 'king-splash-screen'

  container.innerHTML = `
		<div style="">
			<div style="">ทรงพระเจริญ</div>
			${createSigningButton(options.signing)}
			${createEnterSiteButton(options)}
		</div>
	`

  document.body.appendChild(container)
}

// Run the createSplashScreen function once the DOM element is mounted.
document.addEventListener('DOMContentLoaded', () => {
  const options = window.KingSplashScreenOptions || {}

  createKingSplashScreen(options)
})
