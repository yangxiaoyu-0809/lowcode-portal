import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { getPageList } from '@/services/api'

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Adding failed, please try again!');
        return false;
    }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//     const hide = message.loading('Configuring');
//     try {
//         await updateRule({
//             name: fields.name,
//             desc: fields.desc,
//             key: fields.key,
//         });
//         hide();
//
//         message.success('Configuration is successful');
//         return true;
//     } catch (error) {
//         hide();
//         message.error('Configuration failed, please try again!');
//         return false;
//     }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};
// 点击设计按钮
const goToDesign = (nowRows:any) => {
    console.log('当前行信息', nowRows);
    // window.location.href = '/lowcode';
    window.open(`/lowcode?id=${nowRows.id}`, '_blank');
}

const PagesMg: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '页面名称',
            dataIndex: 'name',
        },
        {
            title: '页面路径'
        },
        {
            title: '功能描述',
            dataIndex: 'describe',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="design"
                    onClick={() => {
                        // handleUpdateModalVisible(true);
                        // setCurrentRow(record);
                        goToDesign(record)
                    }}
                >
                    设计
                </a>,
                <a key="pageSetting">
                    页面设置
                </a>,
                <Button key="del" type="link" danger>
                    删除
                </Button>
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle='页面管理'
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                options = {false}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalVisible(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={getPageList}
                columns={columns}
            />

            <ModalForm
                title='新建页面'
                width="400px"
                layout='horizontal'
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.RuleListItem);
                    if (success) {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="页面名称"
                    placeholder="请输入页面名称"
                />
                <ProFormText
                    width="md"
                    name="path"
                    label="页面路径"
                    placeholder="这里改为树状选择器"
                />
                <ProFormTextArea width="md" name="desc" label="功能描述"/>
            </ModalForm>

            {/*<UpdateForm*/}
            {/*    onSubmit={async (value) => {*/}
            {/*        const success = await handleUpdate(value);*/}
            {/*        if (success) {*/}
            {/*            handleUpdateModalVisible(false);*/}
            {/*            setCurrentRow(undefined);*/}
            {/*            if (actionRef.current) {*/}
            {/*                actionRef.current.reload();*/}
            {/*            }*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    onCancel={() => {*/}
            {/*        handleUpdateModalVisible(false);*/}
            {/*        if (!showDetail) {*/}
            {/*            setCurrentRow(undefined);*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    updateModalVisible={updateModalVisible}*/}
            {/*    values={currentRow || {}}*/}
            {/*/>*/}

        </PageContainer>
    );
};

export default PagesMg;
