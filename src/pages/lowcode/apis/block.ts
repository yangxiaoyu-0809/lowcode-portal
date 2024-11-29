import { request } from "../utils";

const BASE_URL = 'http://localhost:7001/api';

// 带搜索条件的区块列表
export const listBlocks = async (params:any) => {
  const url = `${BASE_URL}/blocks?search=${params}`;
  const res = await request(url);
  console.log('res: ', res);
  if (res.code) {
    console.error('list block failed: ', res);
    return;
  }
  return res;

}

export const getBlockById = async (id:any) => {
  const url = `${BASE_URL}/blocks/${id}`;
  const res = await request(url);
  console.log('res: ', res);
  if (res.code) {
    console.error('list block failed: ', res);
    return;
  }
  return res.data;
}

export const createBlock = async (block:any) => {
  const url = `${BASE_URL}/blocks`;
  const res = await (await fetch(url, {
    method: 'post',
    headers: {
     'Content-Type': 'application/json'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
    body: JSON.stringify({block})
})).json()
  // console.log('res: ', res);
  // if (res.code) {
  //   console.error('create block failed: ', res);
  //   return;
  // }
  return res;
}
//根据id删除区块
export const delBlock = async (id:any) => {
  const url = `${BASE_URL}/blocks/${id}`;
  const res = await (await fetch(url, {
    method: 'delete'
  })).json()
  return res;
}


//新建分组
export const addGroup = async (group:any) => {
  const url = `${BASE_URL}/groups`;
  const res = await (await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({group})
  })).json()
  // console.log('res: ', res);
  // if (res.code) {
  //   console.error('create block failed: ', res);
  //   return;
  // }
  return res;
}
//获取所有分组列表
export const groupList = async () => {
  const url = `${BASE_URL}/groups`;
  const res = await request(url);
  // if (res.code) {
  //   console.error('list block failed: ', res);
  //   return;
  // }
  return res;
}
