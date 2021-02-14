import I18nDataInterface from '../interfaces/I18nDataInterface'
import I18nResourcesInterface from '../interfaces/I18nResourcesInterface'

export default class I18nDataUtil {
    /**
     * @param data {I18nDataInterface} Example:
     *     {
     *         en: {
     *             title: 'Title'
     *         },
     *         ru: {
     *             title: 'Заголовок'
     *         }
     *     }
     * @return {I18nResourcesInterface} Example:
     *     {
     *         en: {
     *             translation: {
     *                 title: 'Title'
     *             }
     *         },
     *         ru: {
     *             translation: {
     *                 title: 'Заголовок'
     *             }
     *         },
     *     }
     */
    public static prepareData(data: I18nDataInterface): I18nResourcesInterface {
        const result: I18nResourcesInterface = {}
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                result[key] = {
                    translation: data[key]
                }
            }
        }
        return result
    }
}