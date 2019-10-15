import React, { SFC } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const BillingHistory: SFC<IProps> = props => {
    return (
        <Wrapper>
            <Card isActive>
                <div>Id</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Info</div>
            </Card>
            {props.items.map((item, i) => (
                <Card key={i}>
                    <div>{item.id.slice(16)}</div>
                    <div>{item.amount}$</div>
                    <div>{moment(item.date).format('L')}</div>
                    <div>{item.info}</div>
                </Card>
            ))}
        </Wrapper>
    )
}
export default BillingHistory

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */
export interface IBillingHistoryItem {
    id: string
    amount: number
    date: Date
    info: string
}
interface IProps {
    items: IBillingHistoryItem[]
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

interface ICardProps {
    isActive?: boolean
}
const Card = styled.div<ICardProps>`
    display: flex;
    justify-content: space-between;
    font-size: 150%;
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    padding: 16px 32px;
    width: 100%;
    border-radius: 3px;
    color: #151515;
    margin-top: 20px;
    cursor: pointer;
    div {
        text-align: center;
        width: 24%;
    }
    ${props =>
        props.isActive &&
        css`
            background-color: #333333;
            border-color: #333333;
            color: white;
        `}
`
