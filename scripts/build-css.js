const fs = require('fs')
const path = require('path')
const util = require('util')
const CleanCSS = require('clean-css')

const writeFileAsync = util.promisify(fs.writeFile)

const source = [
  'node_modules/@natgeo/styleguide/lib/styles/styleguide-default.css',
  'node_modules/@natgeo/modules-global-footer/lib/skinny/GlobalFooter.css',
  'node_modules/@natgeo/packages-registration/legacy/v5/main.scss',
  'node_modules/@natgeo/modules-global-nav/lib/GlobalNav.css',
  'node_modules/@natgeo/web-components-react-image/lib/styles.css',
  'node_modules/@natgeo/web-components-react-promo-card/lib/styles.css',
  'node_modules/@natgeo/web-components-react-ad-manager/lib/styles.css',
  'node_modules/@natgeo/web-components-react-kicker/lib/styles.css',
  'node_modules/@natgeo/web-components-react-promo-list/lib/styles.css',
]

const outputFilename = './static/css/styles.min.css'

const outputFolder = path.dirname(outputFilename)

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}

const config = {
  level: 0,
  returnPromise: true,
}

new CleanCSS(config)
  .minify(source)
  .then(output => writeFileAsync(outputFilename, output.styles))
  .catch(error => {
    console.error(error)
  })
