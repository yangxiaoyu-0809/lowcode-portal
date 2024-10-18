import * as React from 'react';

import { common, project, event } from '@alilc/lowcode-engine';
import { Loading, Box, Divider, Search} from '@alifd/next';

import { default as BlockCard } from '../card';
import { default as store } from '../store';

import { Collapse } from 'antd';
const { Panel } = Collapse;

import './index.scss';

const { useState, useEffect } = React;

const DEFAULT_SCREENSHOT = 'https://tianshu.alicdn.com/19307bb5-2881-44ad-82d3-f92e2f44aabb.png';

export interface Block {

}

export interface BlockResponse {
    code: number;
    data: Block[];
}

export interface BlockPaneAPI {
    listBlocks: () => BlockResponse;
}

export interface BlockPaneProps {
    api: BlockPaneAPI
}

export const BlockPane = (props: BlockPaneProps) => {
    const { api } = props;
    const [ blocks, setBlocks ] = useState();
    const { listBlocks } = api;
    const fetchBlocks = async (search) => {
        const res = await listBlocks(search);
        if (res?.code) {
            console.error('list block failed: ', res);
            return;
        }
        console.log('res in plugin: ', res);
        store.init(res);
        setBlocks(res);
    };
    useEffect(() => {
        event.on('common:BlockChanged', () => {
            fetchBlocks('');
        })
        fetchBlocks('');
    }, []);

    const registerAdditive = (shell: HTMLDivElement | null) => {
        console.log('shell: ', shell);
        if (!shell || shell.dataset.registered) {
            return;
        }

        function getSnippetId(elem: any) {
            if (!elem) {
                return null;
            }
            while (shell !== elem) {
                console.log('elem.classList; ', elem.classList);
                if (elem.classList.contains('snippet')) {
                    return elem.dataset.id;
                }
                elem = elem.parentNode;
            }
            return null;
        }

        const _dragon = common.designerCabin.dragon
        console.log('_dragon: ', _dragon);
        if (!_dragon) {
            return;
        }

        // eslint-disable-next-line
        const click = (e: Event) => {};

        shell.addEventListener('click', click);

        _dragon.from(shell, (e: Event) => {
            const doc = project.getCurrentDocument();
            const id = getSnippetId(e.target);
            console.log('doc: ', doc);
            console.log('id: ', id);
            if (!doc || !id) {
                return false;
            }

            console.log('store.get(id): ', store.get(id));

            const dragTarget = {
                type: 'nodedata',
                data: store.get(id),
            };

            return dragTarget;
        });

        shell.dataset.registered = 'true';
    };

    // 搜索区块
    const onBlockSearch = (search) => {
        fetchBlocks(search);
        console.log('点击了搜索区块按钮')
    }

    if (!blocks?.length) {
        return <div className='block-pane-loading'><Loading /></div>
    }

    return <>
        <div className='searchFixedCon'>
            <Search shape="simple" placeholder="搜索区块或分组" onSearch={onBlockSearch}/>
        </div>
        <div className='block-pane' ref={registerAdditive}>
            {
                blocks?.map(item =>
                    <>
                        <div className='groupName'>{item.groupName}</div>
                        <Box direction='row' wrap>
                            {
                                item.list.map(subItem => <BlockCard id={subItem.id} title={subItem.title} screenshot={subItem.screenshot || DEFAULT_SCREENSHOT} blockData={subItem}/>)
                            }
                        </Box>
                    </>
                )
            }
        </div>
    </>;
}

export default BlockPane;
