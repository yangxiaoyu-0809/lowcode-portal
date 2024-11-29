import { request } from 'umi';
const baseUrl = 'http://localhost:7001';
//获取页面列表
export async function getPageList(
    params: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>(baseUrl+'/api/pageMg', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
