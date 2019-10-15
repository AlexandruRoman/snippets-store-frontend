import React, { SFC } from 'react'
import styled from 'styled-components'
import MyButton from './MyButton'
import { Icon, Label } from 'semantic-ui-react'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const ProductCard: SFC<IProps> = props => {
    let color: 'black' | 'yellow' | 'red' | 'green' = 'black'
    switch (props.status) {
        case 'PROPOSED':
            color = 'yellow'
            break
        case 'ACCEPTED':
            color = 'green'
            break
        case 'REJECTED':
            color = 'red'
            break
        default:
            color = 'black'
            break
    }
    return (
        <Wrapper>
            <Img onClick={props.onClick} src={props.img} />
            <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                        <div style={{ fontSize: '120%', cursor: 'pointer' }} onClick={props.onClick}>
                            {props.name}
                        </div>
                        <div style={{ fontSize: '90%', marginTop: '5px' }}>by {props.seller}</div>
                        {props.status && (
                            <Label size='tiny' color={color}>
                                {props.status}
                            </Label>
                        )}
                    </div>
                    <div>
                        <div>
                            <Icon name='heart outline' /> {props.loves}
                        </div>
                        <div>
                            <Icon name='eye' /> {props.views}
                        </div>
                    </div>
                </div>
                <div>
                    {props.actionItems.map((item, i) => (
                        <ActionItem text={item.text} key={i} isFluid color={item.color} onClick={item.action} />
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}
export default ProductCard

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */
export interface IProductCardActionItem {
    text: string
    color: string
    action: () => void
}

interface IProps {
    id?: string
    name: string
    seller: string
    views: number
    loves: number
    img: string
    onClick: () => void
    actionItems: IProductCardActionItem[]
    status?: string
}
export interface IProductCardProps extends IProps {}

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
    border-color: #c9c9c9;
    border-style: solid;
    border-width: 1.25px;
    padding: 16px 32px;
    width: 100%;
    border-radius: 3px;
    color: #151515;
    min-height: 250px;
    min-width: 600px;
`

interface IActionItemProps {
    color: string
}
const ActionItem = styled(MyButton)<IActionItemProps>`
    margin-top: 10px;
`

interface IImgProps {
    src: string
}
const Img = styled.div<IImgProps>`
    cursor: pointer;
    min-height: 100%;
    width: 380px;
    background-size: 100%;
    overflow: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${props => props.src});
    margin-right: 32px;
`
