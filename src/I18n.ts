import EventDispatcher from 'ts-event-dispatcher'
import I18nDataInterface from './interfaces/I18nDataInterface'
import I18nItems from './I18nItems'
import I18nItem from './I18nItem'
import i18next, {InitOptions, TFunction, TOptions} from 'i18next'
import {i18n} from 'i18next'
import I18nDataUtil from './utils/I18nDataUtil'
import I18nResourcesInterface from './interfaces/I18nResourcesInterface'

export default class I18n extends EventDispatcher {
    private readonly _i18n: i18n
    private readonly _items: I18nItems

    public constructor() {
        super()
        this._i18n = i18next.createInstance()
        this._items = new I18nItems(this._i18n)
    }

    /**
     * @param data {I18nDataInterface} Example:
     *     {
     *         en: {
     *             titles: {
     *                 selectLanguage: 'Select language',
     *                 simpleExample: 'Simple example',
     *                 plural: 'Plural',
     *                 notFound: 'Not found'
     *             },
     *             title: 'Title',
     *             description: 'Description',
     *             dogs: '{{count}} dog',
     *             dogs_plural: '{{count}} dogs'
     *         },
     *         ru: {
     *             titles: {
     *                 selectLanguage: 'Выберите язык',
     *                 simpleExample: 'Простой пример',
     *                 plural: 'Множественное число',
     *                 notFound: 'Не найдено'
     *             },
     *             title: 'Заголовок',
     *             description: 'Описание',
     *             dogs_0: '{{count}} собака',
     *             dogs_1: '{{count}} собаки',
     *             dogs_2: '{{count}} собак'
     *         }
     *     }
     * @param language {string} Example:
     *     'en'
     * @return {Promise<TFunction>}
     */
    public init(data: I18nDataInterface, language: string): Promise<TFunction> {
        const resources: I18nResourcesInterface = I18nDataUtil.prepareData(data)
        const initOptions: InitOptions = {
            lng: language,
            resources: resources,
            initImmediate: false
        }
        return this._i18n.init(initOptions)
    }

    /**
     * @param element {Element}
     * @param parameters {TOptions<Object> | string} Example:
     *     {
     *         count: 1
     *     }
     */
    public t(element: Element, parameters: TOptions<Object> | string = {}): void {
        this._translate(element, parameters)
        this._translateChildren(element)
    }

    private _translateChildren(element: Element): void {
        const elements: HTMLCollectionOf<Element> = element.getElementsByTagName('*')
        for (let i = 0; i < elements.length; i++) {
            this._translate(elements[i])
        }
    }

    private _translate(element: Element, parameters: TOptions<Object> | string = {}): void {
        if (!I18nItem.needTranslateElement(element)) return
        const item: I18nItem = this._items.getItem(element)
        item.t(parameters)
    }

    /**
     * @param language {string} Example:
     *     'en'
     * @return {Promise<TFunction>}
     */
    public changeLanguage(language: string): Promise<Function> {
        return new Promise((resolve: Function, reject: Function) => {
            this._i18n.changeLanguage(language)
                .then(() => {
                    this._items.update()
                    resolve()
                }, () => reject())
        })
    }

    /**
     * After this method element and children text does not change.
     * The method must be called before removing some element.
     * If this is not done, then unnecessary data will remain in memory.
     * @param element {Element}
     */
    public remove(element: Element): void {
        this._remove(element)
        this._removeChildren(element)
    }

    private _remove(element: Element): void {
        if (!I18nItem.needTranslateElement(element)) return
        this._items.remove(element)
    }

    private _removeChildren(element: Element): void {
        const elements: HTMLCollectionOf<Element> = element.getElementsByTagName('*')
        for (let i = 0; i < elements.length; i++) {
            this._remove(elements[i])
        }
    }
}