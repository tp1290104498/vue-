import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import { Loading } from 'element-ui';
import 'vant/lib/index.css'
import _ from 'lodash'

let instance = axios.create({
    // baseURL: process.env.BASE_URL,
    timeout: 60000,
})

// loading对象
let loading

// 当前正在请求的数量
let needLoadingRequestCount = 0
instance.interceptors.request.use(req => {
    return req;
})
// 显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0 && !loading) {
        loading = Loading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.5)',
            target: target || 'body'
        })
    }
    needLoadingRequestCount++
}
// 隐藏loading
function hideLoading() {
    needLoadingRequestCount--
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 做个保护
    if (needLoadingRequestCount === 0) {
        // 关闭loading
        toHideLoading()
    }
}
// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
    loading.close()
    loading = null
})
instance.interceptors.response.use(({ data }) => {
    // 判断当前请求是否设置了不显示Loading
    //   if (config.headers.showLoading !== false) {
    //     showLoading(config.headers.loadingTarget)
    //   }
    showLoading()
    if (data.code !== 1000) { // 这个不是res.code， 而是后端人员自定义的，根据自己项目实际情况来决定
        Toast({
            message: data.msg,
            timeout: 1500,
            icon: 'fail',
        })
    }
    return data
}, err => {
    // 判断当前请求是否设置了不显示Loading
    //   if (config.headers.showLoading !== false) {
    //     hideLoading()
    //   }
    hideLoading()
    Toast({
        message: `\n${err.message}`,
        timeout: 1500,
    })
})
// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
        if (response.config.headers.showLoading !== false) {
            hideLoading()
        }
        return response
    },
    error => {
        // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
        if (error.config.headers.showLoading !== false) {
            hideLoading()
        }
        if (error.response && error.response.data && error.response.data.message) {
            var jsonObj = JSON.parse(error.response.data.message)
            // Message.error(jsonObj.message)
        } else {
            // Message.error(error.message)
        }
        // return Promise.reject(error)
    }
)
export default (method, url, data = null) => {
    method = method.toLowerCase();
    if (method === 'post') {
        return instance.post(url, qs.stringify(data))
    } else if (method === 'get') {
        return instance.get(url, { params: data })
    }
}
