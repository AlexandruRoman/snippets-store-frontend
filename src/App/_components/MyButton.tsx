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

const MyButton: SFC<IProps> = props => {
    return (
        <Button
            className={props.className}
            isActive={props.isActive}
            onClick={props.onClick}
            isBold={props.isBold}
            isFluid={props.isFluid}
        >
            {props.text}
        </Button>
    )
}
export default MyButton

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    className?: string
    text: string
    isActive?: boolean
    isBold?: boolean
    isFluid?: boolean
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

interface IWrapperProps {}
const Wrapper = styled.div<IWrapperProps>``

interface IButtonProps {
    isActive?: boolean
    isBold?: boolean
    isFluid?: boolean
}
const Button = styled.div<IButtonProps>`
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    display: inline-block;
    padding: 4px 32px;
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
    ${props =>
        props.isBold &&
        css`
            font-weight: bold;
        `}
    ${props =>
        props.isFluid &&
        css`
            width: 100%;
        `}
    :hover {
        background-color: #333333;
        border-color: #333333;
        color: white;
    }
`
