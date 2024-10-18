import * as React from 'react';
import {Balloon, Dialog, Form, Icon, Input, Select} from "@alifd/next";
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';

const { useState, useEffect } = React;
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
            footer={false}
            onClose={onClose}
        >
            <div style={{width: "500px"}}>
                <Form {...formItemLayout} colon isPreview>
                    <FormItem name="name" label="英文名" required>
                        <Input defaultValue={blockData.name}/>
                    </FormItem>
                    <FormItem name="title" label="中文名" required>
                        <Input defaultValue={blockData.title}/>
                    </FormItem>
                    <FormItem name="groupName" label="所属分组" required>
                        <Input defaultValue={blockData.groupName}/>
                    </FormItem>
                    <FormItem name="screenshot" label="缩略图">
                        <div className='block-screenshot'>
                            <Image src={blockData.screenshot}/>
                        </div>
                    </FormItem>
                    <FormItem label="备注" name="remark">
                        <Input.TextArea defaultValue={blockData.remark}/>
                    </FormItem>
                </Form>


            </div>
        </Dialog>
    </>
;
};

export default BlockCard;
