import React, { SFC } from 'react'
import styled from 'styled-components'
import user from '../../_assets/icons/user.png'
import { HorizontalMargin, VerticalMargin } from './AppMenu'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const Comment: SFC<IProps> = props => {
    return (
        <Wrapper>
            <div>
                <img src={user} style={{ height: '60px' }} />
            </div>
            <HorizontalMargin size={10} />
            <div>
                <div style={{ fontSize: '130%' }}>{props.author}</div>
                <VerticalMargin size={10} />

                <div>{props.text}</div>
            </div>
        </Wrapper>
    )
}
export default Comment

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    author: string
    text: string
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
    display: flex;
    font-weight: 550;
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    padding: 16px 32px;
    width: 100%;
    border-radius: 3px;
    color: #151515;
`
