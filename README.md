# ทรงพระเจริญ.js (SongPhraCharoen.js)

เพิ่มหน้า "ทรงพระเจริญ" เข้าไปในเว็บคุณภายใน 1 นาที โดยไม่ต้องเขียนโค้ดเพิ่ม ลดเวลาพัฒนาเว็บของนักพัฒนารัฐบาลให้ไปทำอะไรที่มีประโยชน์กว่านี้

Easily add Song Phra Charoen splash screen and save thousands of government web developer's time to do more useful things

![sample image](./docs/assets/sample-1.png)

### Quick Start

Add the following script tag to use SongPhraCharoen.js

```html
<script src="//www.unpkg.com/songphracharoen@1.2.0/dist/index.js"></script>
```

### Usage with NPM

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

### Configuration

Refer to the exported `KingSplashScreenOptions` type for the up-to-date configuration options.

For example:

```html
<script>
  // Enables the book signing button (ลงนามถวายพระพร)
  window.KingSplashScreenOptions.signing = true

  // Use the english language as the default language.
  window.KingSplashScreenOptions.language = 'en'

  // Uses the "blue" theme instead.
  window.KingSplashScreenOptions.theme = 'blue'
</script>
```
