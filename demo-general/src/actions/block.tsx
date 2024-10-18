import * as React from 'react';
import { Node } from '@alilc/lowcode-engine';
import { Dialog, Form, Input, Button, Select, Icon, Balloon, Notification, Field} from '@alifd/next';
import { default as html2canvas } from 'html2canvas';
import { Image } from 'antd';
import 'antd/dist/antd.css';

import { createBlock, addGroup, groupList } from '../apis/block';
import './index.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const showAddGroup = <Button type="primary"><Icon type="add" />{' 新建分组'}</Button>;

interface SaveAsBlockProps {
    node: Node;
}

let dialog;

const SaveAsBlock = (props: SaveAsBlockProps) => {
    const { node } = props;
    const [ src, setSrc ] = React.useState();

    // const [ groupName, setGroupName ] = React.useState('');
    const [ groups, setGroups ] = React.useState([]);
    React.useEffect(() => {
        const generateImage = async () => {
            let dom2 = node.getDOMNode();
            console.log('html2canvas: ', html2canvas);
            // const canvas = await html2canvas?.(dom2, { scale: 0.5 });
            const canvas = await html2canvas?.(dom2);
            const dataUrl = canvas.toDataURL();
            setSrc(dataUrl);
        };
        getGroupList()
        generateImage();
    }, []);

    const save = async (values) => {
        const { name, title, groupId, remark } = values;
        const { schema } = node;
        console.log('values: ', values);
        console.log('schema: ', node.schema);
        const groupItem = groups.find(item => item.id === groupId)
        const res = await createBlock({
            name,
            title,
            groupId,
            groupName:groupItem.name,
            schema: JSON.stringify(schema),
            screenshot: src,
            remark
        });
        console.log('保存后的返回res: ', res);
        dialog?.hide();
    }

    // 新建保存分组提交
    const saveGroup = async (values) => {
        console.log('保存分组名称时的数据',values)
        const res = await addGroup({
            name:values.groupName
        })
        //刷新分组下拉数据
        getGroupList()

        //这里存在问题，先注释一下，后期优化
        // if(res.code === 0){
        //     //关闭小弹窗
        //
        //     //刷新分组下拉数据
        //     getGroupList()
        //
        // }else{
        //     Notification.open({
        //         title: '',
        //         content:res.message,
        //         type:'error',
        //     });
        // }
    }
    //获取全部分组列表
    const getGroupList = async () => {
        const res = await groupList()
        console.log('获取到的分组列表',res)
        setGroups(res)
    }

    return <div className='popCon'>
        <Form colon>
            <FormItem
                name="name"
                label="英文名"
                required
                requiredMessage="Please input name!"
            >
                <Input />
            </FormItem>
            <FormItem
                name="title"
                label="中文名"
                required
                requiredMessage="请输入中文名"
            >
                <Input />
            </FormItem>
            <FormItem
                name="groupId"
                label="所属分组"
                required
                requiredMessage="请选择分组"
            >
                <Select placeholder="请选择分组"
                        showSearch hasClear
                        style={{ marginRight: 8,width:502 }}>
                    { groups.map(item => <Option value={item.id}>{item.name}</Option>) }
                </Select>
                <Balloon v2 type="primary" autoFocus trigger={showAddGroup} closable={false}
                         title='新建分组' triggerType="click">
                    <Form colon>
                        <FormItem
                            name="groupName"
                            label=""
                            required
                            requiredMessage="请输入新的分组名"
                        >
                            <Input placeholder="请输入新的分组名" />
                        </FormItem>
                        <Form.Submit
                            type="primary"
                            validate
                            onClick={saveGroup}
                        >提交
                        </Form.Submit>
                    </Form>
                </Balloon>
            </FormItem>
            <FormItem
                name="screenshot"
                label="缩略图"
            >
                <div className='block-screenshot'>
                    <Image src={src}/>
                </div>
                <Input value={src} style={{display: 'none'}}/>
            </FormItem>

            <FormItem label="备注" help="此区块的详细描述" name="remark">
                <Input.TextArea placeholder="此区块的详细描述" />
            </FormItem>

            <FormItem label=" " colon={false}>
                <Form.Submit
                    type="primary"
                    validate
                    onClick={save}
                    style={{ marginRight: 8 }}
                >
                    保存
                </Form.Submit>
                <Form.Reset>重置</Form.Reset>
            </FormItem>
        </Form>
    </div>
}


export default {
    name: 'add',
    content: {
        icon: {
            type: 'add',
            size: 'xs'
        },
        title: '保存为区块',
        action(node: Node) {
            console.log('node: ', node);
            dialog = Dialog.show({
                v2: true,
                title: "保存为区块",
                content: <SaveAsBlock node={node} />,
                footer: false
            });
        },
    },
    important: true,
};
