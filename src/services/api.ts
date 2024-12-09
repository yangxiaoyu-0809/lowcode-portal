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
//根据id获取页面详细信息
export async function getPageDetails(id: string) {
    const url = `${baseUrl}/api/pageMg/${id}`;
    const res = await request(url);
    if (res.code) {
        console.error('获取失败: ', res);
        return;
    }
    return res;
}
//编辑页面保存
export async function editPage (info: Object){
    const url = `${baseUrl}/api/pageMg/edit`;
    const res = await (await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...info})
    })).json()
    return res
}


