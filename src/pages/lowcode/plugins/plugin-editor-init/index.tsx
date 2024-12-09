import { message } from 'antd';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../services/assets.json';
import {getPageSchemaById, getProjectSchema} from '../../services/mockService';
const EditorInitPlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx;
      const scenarioName = options['scenarioName'];
      const scenarioDisplayName = options['displayName'] || scenarioName;
      const scenarioInfo = options['info'] || {};
      // 保存在 config 中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);
      config.set('scenarioDisplayName', scenarioDisplayName);
      config.set('scenarioInfo', scenarioInfo);

      // 设置物料描述

      await material.setAssets(await injectAssets(assets));

      // 从数据库获取页面schema数据
      const pageInfoObj = await getPageSchemaById()
      if(pageInfoObj.code === 0){
        if (pageInfoObj.data.schema !== '' && pageInfoObj.data.schema){
          const schema = pageInfoObj.data.schema;
          let databaseSchema = JSON.parse(schema);
          // 加载 schema
          project.importSchema(databaseSchema as any);
        }else {
          //如果页面还没有设计过，就先加载本地json文件
          const schema = await getProjectSchema(scenarioName);
          console.log('初始化时的schema',schema);
          // 加载 schema
          project.importSchema(schema as any);
        }
      }else{
        message.error('服务器异常，请稍后重试')
      }
    },
  };
}
EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {
  preferenceDeclaration: {
    title: '保存插件配置',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: '用于localstorage存储key',
      },
      {
        key: 'displayName',
        type: 'string',
        description: '用于显示的场景名',
      },
      {
        key: 'info',
        type: 'object',
        description: '用于扩展信息',
      }
    ],
  },
};
export default EditorInitPlugin;
