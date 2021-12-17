// 修改路由。 在最前面添加一个 /foo 路由，
export function patchRoutes({ routes }:any) {
    routes.unshift({
        path: '/foo',
        title:'foo',
        exact: true,
        component: require('@/extraRoutes/foo').default,
    });
}

//   覆写 render。 比如用于渲染之前做权限校验，
import { history } from 'umi';
export function render(oldRender:any) {
    if(window.localStorage.getItem('token')||history.location.pathname==='/login'){
        oldRender();
    }else{
        history.push('/login');
    }
}
// 在初始加载和路由切换时做一些事情。比如用于做埋点统计，
export function onRouteChange({ location, routes, action,matchedRoutes }:any) {
    // bacon(location.pathname);
    
    if (matchedRoutes.length) {//设置标题
        let title = matchedRoutes[matchedRoutes.length - 1].route.title;
        document.title = title || '';
    }
  }

//   修改交给 react-dom 渲染时的根组件。比如用于在外面包一个 Provider，
//   export function rootContainer(container) {
//     return React.createElement(ThemeProvider, null, container);
//   }