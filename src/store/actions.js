import getUrl from '@/api/index'
let httpData = {};
for (let key in getUrl) {
    httpData[key] = async ({ commit }, params = {}) => await getUrl[key](params)
}
export default {
    ...httpData
}
