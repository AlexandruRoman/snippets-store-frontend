import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { authRoleSelector } from '../../_brain/auth/auth'
import {
    locationSelector,
    routeConstants,
    gotoCustomerSubscriptionsAction,
    gotoCustomerBalanceAction,
    gotoSellerBalanceAction,
    gotoSellerTemplatesAction,
    gotoSellerSnippetsAction,
    gotoSellerPaymentAction,
    gotoLoginAction,
    gotoSignupAction,
    gotoBecomeSellerAction,
    gotoHomeAction,
    gotoBrowseTemplatesAction,
    gotoBrowseSnippetsAction,
    gotoStaffManageIncomingSnippetsAction,
    gotoAdminCreateStaffAccountAction
} from '../../_brain/router'
import { LocationState } from 'redux-first-router'
import { authLogoutStartAction } from '../../_brain/auth/_ducks/logout'
import MyButton from './MyButton'
import BurgerMenu, { IBurgerMenuItem } from './BurgerMenu'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class AppMenu extends Component<IProps, IState> {
    getBasicMenu = () => (
        <MenuContainer>
            <Home onClick={this.props.gotoHome}>SnippetMarket</Home>
            {this.props.userRole == 'GUEST' ? (
                <FlexContainer>
                    <MyButton isBold onClick={this.props.gotoLogin} text='Login' />
                    <HorizontalMargin size={4} />
                    <MyButton isBold onClick={this.props.gotoSignup} text='Signup' />
                    <HorizontalMargin size={4} />
                    <MyButton isBold onClick={this.props.gotoBecomeSeller} text='Become Seller' />
                </FlexContainer>
            ) : (
                <FlexContainer>
                    <MyButton isBold onClick={() => this.props.logout({})} text='Logout' />
                </FlexContainer>
            )}
        </MenuContainer>
    )
    getMenu = (isTemplate: boolean, isSnippet: boolean, menuOptions: IBurgerMenuItem[]) => (
        <MenuContainer>
            <FlexContainer>
                <Home onClick={this.props.gotoHome}>SnippetMarket</Home>
                <HorizontalMargin size={8} />
                <MyButton onClick={this.props.gotoBrowseTemplates} isActive={isTemplate} text='Templates' />
                <HorizontalMargin size={6} />
                <MyButton onClick={this.props.gotoBrowseSnippets} isActive={isSnippet} text='Snippets' />
            </FlexContainer>
            <BurgerMenu items={menuOptions} />
        </MenuContainer>
    )
    render() {
        const type = this.props.location.type
        const isBasic =
            [routeConstants.HOME, routeConstants.BECOME_SELLER, routeConstants.LOGIN, routeConstants.SIGNUP].indexOf(
                type
            ) != -1
        const isTemplate =
            [
                routeConstants.TEMPLATE,
                routeConstants.BROWSE_TEMPLATES,
                routeConstants.SELLER.TEMPLATE,
                routeConstants.SELLER.TEMPLATES
            ].indexOf(type) != -1
        const isSnippet =
            [
                routeConstants.SNIPPET,
                routeConstants.BROWSE_SNIPPETS,
                routeConstants.SELLER.SNIPPET,
                routeConstants.SELLER.SNIPPETS
            ].indexOf(type) != -1
        let menuOptions: IBurgerMenuItem[] = []
        switch (this.props.userRole) {
            case 'GUEST':
                menuOptions = [
                    { text: 'Login', action: this.props.gotoLogin },
                    { text: 'Signup', action: this.props.gotoSignup },
                    { text: 'Become Seller', action: this.props.gotoBecomeSeller }
                ]
                break
            case 'CLIENT':
                menuOptions = [
                    { text: 'Subscriptions', action: this.props.gotoCustomerSubscriptions },
                    { text: 'Balance', action: this.props.gotoCustomerBalance },
                    { text: 'Logout', action: () => this.props.logout({}) }
                ]
                break
            case 'SELLER':
                menuOptions = [
                    { text: 'Payment', action: this.props.gotoSellerPayment },
                    { text: 'Balance', action: this.props.gotoSellerBalance },
                    { text: 'Templates', action: this.props.gotoSellerTemplates },
                    { text: 'Snippets', action: this.props.gotoSellerSnippets },
                    { text: 'Logout', action: () => this.props.logout({}) }
                ]
                break
            case 'STAFF':
                menuOptions = [
                    { text: 'Dashboard', action: this.props.gotoManageIncomingSnippets },
                    { text: 'Logout', action: () => this.props.logout({}) }
                ]
                break
            case 'ADMIN':
                menuOptions = [
                    { text: 'Dashboard', action: this.props.gotoAdminCreateStaffAccount },
                    { text: 'Logout', action: () => this.props.logout({}) }
                ]
                break

            default:
                break
        }
        return <Wrapper>{isBasic ? this.getBasicMenu() : this.getMenu(isTemplate, isSnippet, menuOptions)}</Wrapper>
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(AppMenu)

/*
 *    .______    _______  _______   __    __  ___   ___
 *    |   _  \  |   ____||       \ |  |  |  | \  \ /  /
 *    |  |_)  | |  |__   |  .--.  ||  |  |  |  \  V  /
 *    |      /  |   __|  |  |  |  ||  |  |  |   >   <
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  |  /  .  \
 *    | _| `.__||_______||_______/  \______/  /__/ \__\
 */

function mapStateToProps(state: any, ownProps: IOwnProps): IStateProps {
    return {
        userRole: authRoleSelector(state),
        location: locationSelector(state)
    }
}

function mapDispatchToProps(dispatch: any, ownProps: IOwnProps): IDispatchProps {
    return bindActionCreators(
        {
            gotoCustomerSubscriptions: gotoCustomerSubscriptionsAction,
            gotoCustomerBalance: gotoCustomerBalanceAction,
            gotoSellerBalance: gotoSellerBalanceAction,
            gotoSellerTemplates: gotoSellerTemplatesAction,
            gotoSellerSnippets: gotoSellerSnippetsAction,
            gotoSellerPayment: gotoSellerPaymentAction,
            logout: authLogoutStartAction,
            gotoHome: gotoHomeAction,
            gotoLogin: gotoLoginAction,
            gotoSignup: gotoSignupAction,
            gotoBecomeSeller: gotoBecomeSellerAction,
            gotoBrowseTemplates: gotoBrowseTemplatesAction,
            gotoBrowseSnippets: gotoBrowseSnippetsAction,
            gotoManageIncomingSnippets: gotoStaffManageIncomingSnippetsAction,
            gotoAdminCreateStaffAccount: gotoAdminCreateStaffAccountAction
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

interface IStateProps {
    userRole: string
    location: LocationState
}

interface IDispatchProps {
    gotoCustomerSubscriptions: typeof gotoCustomerSubscriptionsAction
    gotoCustomerBalance: typeof gotoCustomerBalanceAction
    gotoSellerBalance: typeof gotoSellerBalanceAction
    gotoSellerTemplates: typeof gotoSellerTemplatesAction
    gotoSellerSnippets: typeof gotoSellerSnippetsAction
    gotoSellerPayment: typeof gotoSellerPaymentAction
    logout: typeof authLogoutStartAction
    gotoHome: typeof gotoHomeAction
    gotoLogin: typeof gotoLoginAction
    gotoSignup: typeof gotoSignupAction
    gotoBecomeSeller: typeof gotoBecomeSellerAction
    gotoBrowseTemplates: typeof gotoBrowseTemplatesAction
    gotoBrowseSnippets: typeof gotoBrowseSnippetsAction
    gotoManageIncomingSnippets: typeof gotoStaffManageIncomingSnippetsAction
    gotoAdminCreateStaffAccount: typeof gotoAdminCreateStaffAccountAction
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
const Wrapper = styled.div<IWrapperProps>``

const Home = styled.div`
    font-size: 200%;
    font-weight: bold;
    cursor: pointer;
`

const MenuContainer = styled.div`
    display: flex;
    padding: 32px 0;
    align-items: center;
    justify-content: space-between;
`

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
`

interface IHorizontalMarginProps {
    size: number
}
export const HorizontalMargin = styled.div<IHorizontalMarginProps>`
    margin: 0 ${props => props.size}px;
`

interface IVerticalMarginProps {
    size: number
}
export const VerticalMargin = styled.div<IVerticalMarginProps>`
    margin: ${props => props.size}px 0;
`
