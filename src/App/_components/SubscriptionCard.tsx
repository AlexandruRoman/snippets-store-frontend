import React, { SFC } from 'react'
import styled from 'styled-components'
import moment from 'moment'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const SubscriptionCard: SFC<IProps> = props => {
    return (
        <Wrapper>
            <div>
                <BoldText>{props.type}</BoldText>
            </div>
            <div>
                <BoldText>Price: </BoldText>
                {props.price}
            </div>
            <div>
                <BoldText>Available: </BoldText>
                {props.days}
            </div>
            <div>
                <BoldText>Starting: </BoldText>
                {moment(props.endDate).format('L')}
            </div>
            <div>
                <BoldText>Next Payment: </BoldText>
                {moment(props.startDate).format('L')}
            </div>
        </Wrapper>
    )
}
export default SubscriptionCard

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    type: string
    price: number
    endDate: Date
    startDate: Date
    days: number
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
    font-size: 150%;
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    display: inline-block;
    padding: 32px 32px;
    border-radius: 3px;
    color: #151515;
    cursor: pointer;
    font-size: 150%;
    div {
        margin: 10px 0;
    }
`

const BoldText = styled.span`
    font-weight: bold;
`
