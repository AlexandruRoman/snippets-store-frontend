import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Segment, Divider } from 'semantic-ui-react'
import BraintreePaymentCard from '../../../../_components/BraintreePaymentCard'
import { api } from '../../../../../_brain/_helpers/api'
import SubscriptionCard from '../../../../_components/SubscriptionCard'
import PlanOption, { IPlanOptionProps } from './_components/PlanOption'
import { flexbox } from '@material-ui/system'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class CustomerSubscriptionsScene extends Component<IProps, IState> {
    state: IState = {
        subscriptions: [],
        subscriptionTypeId: '',
        subscriptionTypes: []
    }
    getSubscription = async () => {
        const response = await api.get('subscription/get-by-client')
        console.log(response.data)
        this.setState({
            subscriptions: response.data.map((subscription: any) => {
                return {
                    days: subscription.type.days,
                    endDate: subscription.endDate,
                    startDate: subscription.startDate,
                    price: subscription.type.price,
                    type: subscription.type.name
                }
            })
        })
    }
    getSubscriptionTypes = async () => {
        const response = await api.get('subscription-type/get-all')
        console.log(response.data)
        this.setState({
            subscriptionTypeId: response.data[0]._id,
            subscriptionTypes: response.data.map((x: any) => {
                const data: IPlanOptionProps = {
                    id: x._id,
                    price: x.price,
                    title: x.name,
                    days: x.days,
                    isActive: x._id == this.state.subscriptionTypeId,
                    onClick: id => this.setState({ subscriptionTypeId: id })
                }
                return data
            })
        })
    }
    componentDidMount() {
        this.getSubscription()
        this.getSubscriptionTypes()
    }
    render() {
        return (
            <Wrapper>
                {this.state.subscriptions.length == 0 ? (
                    <div>
                        <div style={{ fontSize: '170%', fontWeight: 'bold' }}>Create a new subscription</div>
                        <div style={{ fontSize: '140%', margin: '30px 0 10px 0' }}>Select a plan</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {this.state.subscriptionTypes.map(x => (
                                <div key={x.id} style={{ width: '24%' }}>
                                    <PlanOption {...x} isActive={x.id == this.state.subscriptionTypeId} />
                                </div>
                            ))}
                        </div>
                        <BraintreePaymentCard subscriptionTypeId={this.state.subscriptionTypeId} />
                    </div>
                ) : (
                    <div>
                        <div style={{ fontSize: '140%', margin: '30px 0 10px 0' }}>Your plan:</div>
                        {this.state.subscriptions.map((subscription, i) => (
                            <SubscriptionCard {...subscription} key={i} />
                        ))}
                    </div>
                )}
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(CustomerSubscriptionsScene)

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

interface ISubscription {
    type: string
    days: number
    price: number
    startDate: Date
    endDate: Date
}
interface IState {
    subscriptions: ISubscription[]
    subscriptionTypeId: string
    subscriptionTypes: IPlanOptionProps[]
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
