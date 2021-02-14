import escapeHTML from 'escape-html-function'
import {i18n, TOptions} from 'i18next'

export default class I18nItem {
    private static readonly _ERROR_MESSAGE: string = 'Key %s do not exist. Language is %s'
    private static readonly _KEY_I18N_ATTRIBUTE: string = 'data-i18n'
    private static readonly _ID_I18N_ATTRIBUTE: string = 'data-i18n-id'

    private readonly _i18n: i18n
    private readonly _element: Element
    private readonly _key: string
    private _parameters: TOptions<Object>

    public static needTranslateElement(element: Element): boolean {
        return element.hasAttribute(I18nItem._KEY_I18N_ATTRIBUTE)
    }

    public static hasId(element: Element): boolean {
        return element.hasAttribute(I18nItem._ID_I18N_ATTRIBUTE)
    }

    public static getId(element: Element): number {
        return parseInt(element.getAttribute(I18nItem._ID_I18N_ATTRIBUTE))
    }

    public constructor(i18n: i18n, element: Element, id: number) {
        this._i18n = i18n
        this._element = element
        this._key = element.getAttribute(I18nItem._KEY_I18N_ATTRIBUTE)
        element.setAttribute(I18nItem._ID_I18N_ATTRIBUTE, id.toString())
    }

    public t(parameters: Object) {
        this._parameters = parameters
        this.update()
    }

    public update() {
        this._check()
        const translate: string = this._i18n.t(this._key, this._parameters)
        const text: string = translate !== undefined ? translate :  this._key
        this._element.innerHTML = escapeHTML(text)
    }

    private _check() {
        const keyExist: boolean = this._i18n.exists(this._key, this._parameters)
        if (keyExist) return
        if (console && console.warn)
            console.warn(I18nItem._ERROR_MESSAGE, this._key, this._i18n.language)
    }

    public remove() {
        this._element.removeAttribute(I18nItem._ID_I18N_ATTRIBUTE)
    }
}