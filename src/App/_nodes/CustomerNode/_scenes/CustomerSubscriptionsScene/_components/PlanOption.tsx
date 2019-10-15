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

const PlanOption: SFC<IProps> = props => {
    return (
        <Wrapper onClick={() => props.onClick(props.id)} isActive={props.isActive}>
            <div style={{ fontSize: '150%', fontWeight: 'bold' }}>{props.title}</div>
            <div style={{ fontSize: '120%', marginTop: '30px' }}>{props.days} days</div>
            <div style={{ fontSize: '150%', marginTop: '30px' }}>{props.price}$</div>
        </Wrapper>
    )
}
export default PlanOption

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    id: string
    title: string
    price: number
    days: number
    isActive?: boolean
    onClick: (id: string) => void
}
export interface IPlanOptionProps extends IProps {}

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
    padding: 32px 32px;
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
