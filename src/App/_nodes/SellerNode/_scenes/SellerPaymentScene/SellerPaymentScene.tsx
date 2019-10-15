import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { api } from '../../../../../_brain/_helpers/api'
import { Input, Form } from 'semantic-ui-react'
import MyButton from '../../../../_components/MyButton'
import { VerticalMargin } from '../../../../_components/AppMenu'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class SellerPaymentScene extends Component<IProps, IState> {
    state: IState = {
        amount: '',
        currentMoney: 0,
        iban: ''
    }
    getCurrentBalance = async () => {
        const response = await api.get('balance/get-current')
        this.setState({ currentMoney: parseFloat(response.data) })
    }
    transferMoney = async () => {
        const response = await api.post('payment/transfer-to-account', {
            iban: this.state.iban,
            amount: parseFloat(this.state.amount)
        })
        console.log(response.data)
        this.getCurrentBalance()
    }
    componentDidMount() {
        this.getCurrentBalance()
    }
    render() {
        return (
            <Wrapper>
                <VerticalMargin size={50} />
                <div style={{ textAlign: 'center', fontSize: '150%' }}>
                    Current Balance: <BoldText>{this.state.currentMoney}</BoldText>
                </div>
                <VerticalMargin size={50} />
                <div>Transfer Money</div>
                <Form>
                    <Form.Field>
                        <label>IBAN</label>
                        <Input
                            type='text'
                            value={this.state.iban}
                            onChange={e => this.setState({ iban: e.target.value })}
                            placeholder='Enter iban...'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount</label>
                        <Input
                            type='text'
                            value={this.state.amount}
                            onChange={e => this.setState({ amount: e.target.value })}
                            placeholder='Enter amount...'
                        />
                    </Form.Field>

                    <MyButton onClick={this.transferMoney} text='Transfer' />
                </Form>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SellerPaymentScene)

/*
 *    .______    _______  _______   __    __  ___   ___
 *    |   _  \  |   ____||       \ |  |  |  | \  \ /  /
 *    |  |_)  | |  |__   |  .--.  ||  |  |  |  \  V  /
 *    |      /  |   __|  |  |  |  ||  |  |  |   >   <
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  |  /  .  \
 *    | _| `.__||_______||_______/  \______/  /__/ \__\
 */

function mapStateToProps(state: any, ownProps: IOwnProps): IStateProps {
    return {}
}

function mapDispatchToProps(dispatch: any, ownProps: IOwnProps): IDispatchProps {
    return bindActionCreators({}, dispatch)
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {
    iban: string
    amount: string
    currentMoney: number
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
    font-size: 150%;
`

const BoldText = styled.span`
    font-weight: bold;
`
