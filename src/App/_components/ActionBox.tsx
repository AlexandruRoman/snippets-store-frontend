import React, { SFC } from 'react'
import styled, { css } from 'styled-components'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const ActionBox: SFC<IProps> = props => {
    return (
        <Wrapper onClick={props.onClick} isActive={props.isActive}>
            <div>{props.text}</div>
            <img src={props.icon} style={{ height: '150px', margin: '48px 0' }} />
        </Wrapper>
    )
}
export default ActionBox

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    icon: string
    isActive?: boolean
    text: string
    onClick: () => void
}

/*
 *         _______.___________.____    ____  __       _______
 *        /       |           |\   \  /   / |  |     |   ____|
 *       |   (----`---|  |----` \   \/   /  |  |     |  |__
 *        \   \       |  |       \_    _/   |  |     |   __|
 *    .----)   |      |  |         |  |     |  `----.|  |____
 *    |_______/       |__|         |__|     |_______||_______|
 */

interface IWrapperProps {
    isActive?: boolean
}
const Wrapper = styled.div<IWrapperProps>`
    display: flex;
    font-weight: 550;
    font-size: 150%;
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    display: inline-block;
    padding: 32px 32px 0 32px;
    width: 100%;
    text-align: center;
    border-radius: 3px;
    color: #151515;
    cursor: pointer;
    ${props =>
        props.isActive &&
        css`
            background-color: #333333;
            border-color: #333333;
            color: white;
        `}
`
