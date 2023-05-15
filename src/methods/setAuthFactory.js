// 在 /admin 及其子元件中寫入 token 欄位
export default function setAuthFactory($http,$router) {
    if (!$http) return

    console.log('setAuthFactory');

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    
    if (!token){
        console.warn('沒有 token')
        $router.push({name:'toLogin'}) // 若無 token, 跳轉 login 頁面
        return
    }
    $http.defaults.headers.common['Authorization'] = token
}


