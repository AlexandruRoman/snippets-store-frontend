import React, { SFC } from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const SidebarLayout: SFC<IProps> = props => {
    return (
        <Wrapper>
            <div className='sidebar'>
                <h1>{props.title}</h1>
                {props.items.map(item => (
                    <Button
                        size='huge'
                        fluid
                        inverted
                        key={item.key}
                        onClick={() => item.action(item.key)}
                        basic={!item.isActive}
                        style={{ marginBottom: '10px' }}
                    >
                        {item.text}
                    </Button>
                ))}
            </div>
            <div className='content'>{props.children}</div>
        </Wrapper>
    )
}
export default SidebarLayout

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    title: string
    items: ISidebarLayoutItem[]
}

export interface ISidebarLayoutItem {
    text: string
    key: number
    action: (key: number) => void
    isActive: boolean
}

/*
 *         _______.___________.____    ____  __       _______
 *        /       |           |\   \  /   / |  |     |   ____|
 *       |   (----`---|  |----` \   \/   /  |  |     |  |__
 *        \   \       |  |       \_    _/   |  |     |   __|
 *    .----)   |      |  |         |  |     |  `----.|  |____
 *    |_______/       |__|         |__|     |_______||_______|
 */

interface IWrapperProps {}
const Wrapper = styled.div<IWrapperProps>`
    height: 100%;
    width: 100%;
    display: flex;
    h1 {
        text-align: center;
    }
    .sidebar {
        width: 400px;
        height: 100%;
        background-color: #04070b;
        color: white;
        padding: 10px;
    }
    .content {
        flex: 1;
        height: 100%;
        overflow: hidden;
    }
`
