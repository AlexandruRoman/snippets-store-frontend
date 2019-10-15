import React, { Component } from 'react'
import styled from 'styled-components'
import { api } from '../../_brain/_helpers/api'
import DropIn from 'braintree-web-drop-in-react'
import MyButton from './MyButton'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

export default class BraintreePaymentCard extends Component<IProps, IState> {
    instance: any
    state: IState = {
        clientToken: null
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/braintree/get-token')
        const clientToken = await response.json() // If returned as JSON string
        console.log(clientToken)

        this.setState({
            clientToken: clientToken.token
        })
    }

    async buy() {
        const { nonce } = await this.instance.requestPaymentMethod()
        const response = await api.post('subscription/add', {
            subscriptionTypeId: this.props.subscriptionTypeId,
            nonce
        })
    }

    render() {
        return (
            <Wrapper>
                {this.state.clientToken && (
                    <DropIn
                        options={{ authorization: this.state.clientToken }}
                        onInstance={(instance: any) => (this.instance = instance)}
                    />
                )}
                <MyButton text='Subscribe' onClick={this.buy.bind(this)} />
            </Wrapper>
        )
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    subscriptionTypeId: string
}

interface IState {
    clientToken: string | null
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
