export default interface I18nResourcesInterface {
    [key: string]: {
        translation: {
            [key: string]: Object | string
        }
    }
}