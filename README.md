# README

## Base
Based on [i18next](https://github.com/i18next/i18next)

## Build demo
```sh
yarn install
yarn webpack
```

## Use
```sh
yand add kokkekpek/i18n
```

```ts
import 'demo-css'
import './css/styles.css'
import createElementFromHTML from 'create-element-from-html-function'
import translations from './translations/translations'
import I18n from 'i18n'

const DEFAULT_LANGUGE: string = 'en'

const html: string =
    `<div>
    <div class="demo__item">
        <h2 class="demo__title" data-i18n="titles.selectLanguage">titles.selectLanguage</h2>
        <select class="demo__select languages-selector-js" style="margin-bottom: 1em">
            <option value="en">English</option>
            <option value="ru">Русский</option>
        </select>
    </div>
    <div class="demo__item">
        <h2 class="demo__title" data-i18n="titles.simpleExample">x</h2>
        <div class="demo__block demo__block_padding">
            <h1 data-i18n="title" class="title">x</h1>
            <p data-i18n="description" class="description">x</p>
        </div>
    </div>
    <div class="demo__item">
        <h2 class="demo__title" data-i18n="titles.plural">x</h2>
        <select class="demo__select dogs-selector-js" style="margin-bottom: 1em">
            <option>0</option>
            <option selected="selected">1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
        <div class="demo__block demo__block_padding">
            <p data-i18n="dogs" class="dogs-js">x</p>
        </div>
    </div>
    <div class="demo__item">
        <h2 class="demo__title" data-i18n="titles.keyDoesNotExist">x</h2>
        <div class="demo__block demo__block_padding">
            <p data-i18n="nonExistentKey">x</p>
        </div>
    </div>
    <div class="demo__item">
        <h2 class="demo__title" data-i18n="titles.removing">x</h2>
        <div class="demo__block demo__block_padding">
            <p data-i18n="justText" class="just-text-js">x</p>
        </div>
        <button class="demo__button remove-js">i18n.remove()</button> <button class="demo__button t-js">i18n.t()</button>
    </div>
</div>`
const element: HTMLElement = createElementFromHTML(html)

const i18n: I18n = new I18n()
i18n.init(translations, DEFAULT_LANGUGE).then(_onI18nInit.bind(this))

function _onI18nInit() {
    /////////////////////
    // CHANGE LANGUAGE //
    /////////////////////
    const languageSelector: HTMLOptionElement = element.querySelector('.languages-selector-js') as HTMLOptionElement
    languageSelector.addEventListener('change', () => {
        i18n.changeLanguage(languageSelector.value).then()
    })



    ///////////////////
    // DOGS SELECTOR //
    ///////////////////
    const dogs: HTMLElement  = element.querySelector('.dogs-js')
    const dogsSelector: HTMLOptionElement = element.querySelector('.dogs-selector-js') as HTMLOptionElement
    dogsSelector.addEventListener('change', () => {
        i18n.t(dogs, {count: parseInt(dogsSelector.value)})
    })
    i18n.t(element)
    i18n.t(dogs, {count: parseInt(dogsSelector.value)})



    //////////////
    // i18n.t() //
    //////////////
    const justTextBlock: HTMLElement  = element.querySelector('.just-text-js')
    const removeButton: HTMLElement  = element.querySelector('.remove-js')
    removeButton.addEventListener('click', () => {
        i18n.remove(justTextBlock)
    })
    const tButton: HTMLElement  = element.querySelector('.t-js')
    tButton.addEventListener('click', () => {
        i18n.t(justTextBlock)
    })

    document.getElementById('js').append(element)
}
```