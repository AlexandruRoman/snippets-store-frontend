import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SidebarLayout, { ISidebarLayoutItem } from '../../../App/_components/SidebarLayout'
import { authLogoutStartAction } from '../../../_brain/auth/_ducks/logout'
import { gotoAdminCreateStaffAccountAction, gotoAdminPaySellersAction } from '../../../_brain/router'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class AdminNode extends Component<IProps, IState> {
    render() {
        const sidebarItems: ISidebarLayoutItem[] = [
            { key: 0, text: 'Manage Staff', action: this.props.gotoAdminCreateStaffAccount, isActive: true },
            { key: 1, text: 'Pay Sellers', action: this.props.gotoAdminPaySellers, isActive: false },
            { key: 2, text: 'Logout', action: () => this.props.logout({}), isActive: false }
        ]
        return (
            <Wrapper>
                <SidebarLayout title='Admin Dashboard' items={sidebarItems}>
                    {this.props.children}
                </SidebarLayout>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(AdminNode)

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
    return bindActionCreators(
        {
            logout: authLogoutStartAction,
            gotoAdminCreateStaffAccount: gotoAdminCreateStaffAccountAction,
            gotoAdminPaySellers: gotoAdminPaySellersAction
        },
        dispatch
    )
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

interface IDispatchProps {
    logout: typeof authLogoutStartAction
    gotoAdminCreateStaffAccount: typeof gotoAdminCreateStaffAccountAction
    gotoAdminPaySellers: typeof gotoAdminPaySellersAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {}

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
    height: 100%;
`
