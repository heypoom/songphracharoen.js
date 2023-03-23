# ทรงพระเจริญ.js (SongPhraCharoen.js)

เพิ่มหน้า "ทรงพระเจริญ" เข้าไปในเว็บคุณภายใน 1 นาที โดยไม่ต้องเขียนโค้ดเพิ่ม ลดเวลาพัฒนาเว็บของนักพัฒนารัฐบาลให้ไปทำอะไรที่มีประโยชน์กว่านี้ให้ประชาชน จะได้คุ้มภาษีหน่อย

Easily add Song Phra Charoen splash screen and save thousands of government web developer's time to do more useful things for the people.

![sample image](./docs/assets/sample-1.png)

### Demo

See the demo in action at [heypoom.github.io/songphracharoen.js](https://heypoom.github.io/songphracharoen.js). The demo uses the latest version of songphracharoen.js.

### Quick Start

Add the following script tag to use SongPhraCharoen.js

```html
<script src="//www.unpkg.com/songphracharoen@1.2.0/dist/index.js"></script>
```

### Install via NPM

You can also install the package using `npm` or `yarn` if needed.

```bash
npm install songphracharoen
```

```bash
yarn add songphracharoen
```

Then, import the package in your JavaScript file.

```js
import 'songphracharoen'
```

### How to customize?

Refer to the exported `KingSplashScreenOptions` type for the up-to-date configuration options.

For example, you can customize whether to enable book signing, the language, and the themes using the below configuration.

```html
<script>
  window.KingSplashScreenOptions = {
    // Enables the book signing button (ลงนามถวายพระพร)
    signing: true,

    // Uses the "blue" theme instead.
    theme: 'sky',

    // Use the english language as the default language.
    language: 'en',
  }
</script>
```

![demo of usage with simple customization](./docs/assets/sample-2.png)
