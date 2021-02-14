import I18nItem from './I18nItem'
import {i18n} from 'i18next'

interface ItemsObject {
    [key: string]: I18nItem
}

export default class I18nItems {
    private readonly _i18n: i18n
    private readonly _items: ItemsObject
    private _id: number

    public constructor(i18n: i18n) {
        this._i18n = i18n
        this._items = {}
        this._id = 0
    }

    public getItem(element: Element): I18nItem {
        return I18nItem.hasId(element) ?
            this._getExistingItem(element) :
            this._getNewItem(element)
    }

    private _getExistingItem(element: Element): I18nItem {
        const id: number = I18nItem.getId(element)
        return this._items[id]
    }

    private _getNewItem(element: Element): I18nItem {
        this._id++
        const item: I18nItem = new I18nItem(this._i18n, element, this._id)
        this._items[this._id] = item
        return item
    }

    public update() {
        for (let key in this._items) {
            if (this._items.hasOwnProperty(key)) {
                const item: I18nItem = this._items[key]
                item.update()
            }
        }
    }

    public remove(element: Element): void {
        if (!I18nItem.hasId(element))
            return

        const id: number = I18nItem.getId(element)
        const item: I18nItem = this._items[id]
        item.remove()
        delete this._items[id]
    }
}