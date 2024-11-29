import * as React from 'react';
import { event } from '@alilc/lowcode-engine';
import {Button, Dialog, Form, Icon, Input, Message} from "@alifd/next";
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
import { delBlock } from '../../../apis/block';

const FormItem = Form.Item;

interface BlockCardProps {
    id: string;
    title: string;
    screenshot: string;
    blockData:object;
}


const BlockCard = (props: BlockCardProps) => {
    const [popVisible, setPopVisible] = React.useState(false)
    const { id, title, screenshot='https://tianshu.alicdn.com/19307bb5-2881-44ad-82d3-f92e2f44aabb.png',blockData} = props;

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
        },
    };
    const showViewPop = () => {
        setPopVisible(true)
    }
    const onClose = () => {
        setPopVisible(false)
    }
    //删除该区块
    const onDelBlock = () => {
        Dialog.confirm({
            v2: true,
            title: '删除',
            content: '确认要删除该区块吗？',
            onOk: () => delBlockFun()
        });
    }
    const delBlockFun = async () => {
        console.log('删除成功')
        const res = await delBlock(id);
        console.log('删除操作后的数据',res)
        if(res.code === 0){
            Message.success('删除成功！')
            setPopVisible(false)
            //去刷新左侧的区块面板
            event.emit('BlockChanged');
        }else{
            Message.error(res.message || '操作失败，请稍后重试')
        }
    }
    return <><div className='block-card snippet' data-id={id}>
                <p className='viewIcon' data-id={'view_'+id} onClick={showViewPop}><Icon type="eye" /></p>
                <div className='block-card-screenshot'>
                    <img src={screenshot} />
                </div>
                <span>{title}</span>
            </div>
        <Dialog
            v2
            title="区块详情"
            visible={popVisible}
            onClose={onClose}
            footer={
                <Button warning type="primary" onClick={onDelBlock}>
                    删除该区块
                </Button>
            }
        >
            <div style={{width: "500px"}}>
                <Form {...formItemLayout} colon isPreview>
                    <FormItem name="name" label="英文名" required>
                        <Input defaultValue={blockData?.name}/>
                    </FormItem>
                    <FormItem name="title" label="中文名" required>
                        <Input defaultValue={blockData?.title}/>
                    </FormItem>
                    <FormItem name="groupName" label="所属分组" required>
                        <Input defaultValue={blockData?.groupName}/>
                    </FormItem>
                    <FormItem name="screenshot" label="缩略图">
                        <div className='block-screenshot'>
                            <Image src={blockData?.screenshot}/>
                        </div>
                    </FormItem>
                    <FormItem label="备注" name="remark">
                        <Input.TextArea defaultValue={blockData?.remark}/>
                    </FormItem>
                </Form>


            </div>
        </Dialog>
    </>
;
};

export default BlockCard;
