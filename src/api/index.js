import req from './http.js'

const context = require.context('@/api/server/', true, /\.js$/);
let urlObj = {}, getUrl = {};
context.keys().forEach(url => {
    let name = url.split('/').slice(1)[0].split('.')[0];
    Object.assign(urlObj, require(`@/api/server/${name}`))
})
let head = url => process.env.VUE_APP_HOST + url;

for (let key in urlObj) {
    let item = urlObj[key];
    Object.assign(getUrl, {[key]: (params = {}) => req(item.method, head(item.url), params)})
}

export default getUrl