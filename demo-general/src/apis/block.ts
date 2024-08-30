import { request } from "src/utils";

const BASE_URL = '/api/v1';

export const listBlocks = async () => {
  //此处为从接口获取，暂时注释，等接口完善后再补充
  // const url = `${BASE_URL}/blocks`;
  // const res = await request(url);
  // console.log('res: ', res);
  // if (res.code) {
  //   console.error('list block failed: ', res);
  //   return;
  // }
  // return res.data;


  //演示环境改为加载静态数据
  let data = []
  return data
}

export const getBlockById = async (id) => {
  const url = `${BASE_URL}/blocks/${id}`;
  const res = await request(url);
  console.log('res: ', res);
  if (res.code) {
    console.error('list block failed: ', res);
    return;
  }
  return res.data;
}

export const createBlock = async (block) => {
  const url = `${BASE_URL}/blocks`;
  const res = await (await fetch(url, {
    method: 'post',
    headers: {
     'Content-Type': 'application/json'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
    body: JSON.stringify({block})
})).json()
  console.log('res: ', res);
  if (res.code) {
    console.error('create block failed: ', res);
    return;
  }
  return res.data;
}
