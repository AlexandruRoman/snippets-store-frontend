import { connectRoutes } from 'redux-first-router'
import React from 'react'
import { NOT_FOUND } from 'redux-first-router'
import HomeScene from '../App/_scenes/HomeScene/HomeScene'
import { action } from 'typesafe-actions'
import { ApplicationState } from './redux'
import LoginScene from '../App/_scenes/LoginScene/LoginScene'
import SignupScene from '../App/_scenes/SignupScene/SignupScene'
import BecomeSellerScene from '../App/_scenes/BecomeSellerScene/BecomeSellerScene'
import BrowseSnippetsScene from '../App/_scenes/BrowserSnippetsScene/BrowseSnippetsScene'
import BrowseTemplatesScene from '../App/_scenes/BrowserTemplatesScene/BrowseTemplatesScene'
import TemplateScene from '../App/_scenes/TemplateScene/TemplateScene'
import SnippetScene from '../App/_scenes/SnippetScene/SnippetScene'
import CreateStaffAccountScene from '../App/_nodes/AdminNode/_scenes/CreateStaffAccountScene/CreateStaffAccountScene'
import ManageIngomingSnippetsScene from '../App/_nodes/StaffNode/_scenes/ManageIncomingSnippetsScene/ManageIngomingSnippetsScene'
import SellerBalanceScene from '../App/_nodes/SellerNode/_scenes/SellerBalanceScene/SellerBalanceScene'
import SellerSnippetScene from '../App/_nodes/SellerNode/_scenes/SellerSnippetScene/SellerSnippetScene'
import SellerTemplateScene from '../App/_nodes/SellerNode/_scenes/SellerTemplateScene/SellerTemplateScene'
import SellerTemplatesScene from '../App/_nodes/SellerNode/_scenes/SellerTemplatesScene/SellerTemplatesScene'
import CustomerBalanceScene from '../App/_nodes/CustomerNode/_scenes/CustomerBalanceScene/CustomerBalanceScene'
import AdminNode from '../App/_nodes/AdminNode/AdminNode'
import StaffNode from '../App/_nodes/StaffNode/StaffNode'
import SellerNode from '../App/_nodes/SellerNode/SellerNode'
import CustomerNode from '../App/_nodes/CustomerNode/CustomerNode'
import PaySellersScene from '../App/_nodes/AdminNode/_scenes/PaySellersScene/PaySellersScene'
import SellerPaymentScene from '../App/_nodes/SellerNode/_scenes/SellerPaymentScene/SellerPaymentScene'
import SellerSnippetsScene from '../App/_nodes/SellerNode/_scenes/SellerSnippetsScene/SellerSnippetsScene'
import CustomerSubscriptionsScene from '../App/_nodes/CustomerNode/_scenes/CustomerSubscriptionsScene/CustomerSubscriptionsScene'

/*
 *    .______     ______    __    __  .___________. _______     _______.
 *    |   _  \   /  __  \  |  |  |  | |           ||   ____|   /       |
 *    |  |_)  | |  |  |  | |  |  |  | `---|  |----`|  |__     |   (----`
 *    |      /  |  |  |  | |  |  |  |     |  |     |   __|     \   \
 *    |  |\  \-.|  `--'  | |  `--'  |     |  |     |  |____.----)   |
 *    | _| `.__| \______/   \______/      |__|     |_______|_______/
 */

export const routeConstants = {
    HOME: 'route/HOME',
    LOGIN: 'route/LOGIN',
    SIGNUP: 'route/SIGNUP',
    BECOME_SELLER: 'route/BECOME_SELLER',
    BROWSE_TEMPLATES: 'route/BROWSE_TEMPLATES',
    BROWSE_SNIPPETS: 'route/BROWSE_SNIPPETS',
    TEMPLATE: 'route/TEMPLATE',
    SNIPPET: 'route/SNIPPET',
    ADMIN: {
        CREATE_STAFF_ACCOUNT: 'route/admin/CREATE_STAFF_ACCOUNT',
        PAY_SELLERS: 'route/admin/PAY_SELLERS'
    },
    STAFF: {
        MANAGE_INCOMING_SNIPPETS: 'route/staff/MANAGE_INCOMING_SNIPPETS'
    },
    SELLER: {
        PAYMENT: 'route/seller/PAYMENT',
        BALANCE: 'route/seller/BALANCE',
        TEMPLATES: 'route/seller/TEMPLATES',
        SNIPPETS: 'route/seller/SNIPPETS',
        SNIPPET: 'route/seller/SNIPPET',
        TEMPLATE: 'route/seller/TEMPLATE'
    },
    CUSTOMER: {
        SUBSCRIPTIONS: 'route/customer/SUBSCRIPTIONS',
        BALANCE: 'route/customer/BALANCE'
    }
}

const appRoutes = {
    [routeConstants.HOME]: '/',
    [routeConstants.LOGIN]: '/login',
    [routeConstants.SIGNUP]: '/signup',
    [routeConstants.BECOME_SELLER]: '/become-seller',
    [routeConstants.BROWSE_SNIPPETS]: '/browse-snippets',
    [routeConstants.BROWSE_TEMPLATES]: '/browse-templates',
    [routeConstants.TEMPLATE]: '/template/:id',
    [routeConstants.SNIPPET]: '/snippet/:id',
    [routeConstants.ADMIN.CREATE_STAFF_ACCOUNT]: '/admin/create-staff-account',
    [routeConstants.ADMIN.PAY_SELLERS]: '/admin/pay-sellers',
    [routeConstants.STAFF.MANAGE_INCOMING_SNIPPETS]: '/staff/manage-incoming-snippets',
    [routeConstants.SELLER.PAYMENT]: '/seller/payment',
    [routeConstants.SELLER.BALANCE]: '/seller/balance',
    [routeConstants.SELLER.TEMPLATES]: '/seller/templates',
    [routeConstants.SELLER.SNIPPETS]: '/seller/snippets',
    [routeConstants.SELLER.SNIPPET]: '/seller/snippet/:id',
    [routeConstants.SELLER.TEMPLATE]: '/seller/template/:id',
    [routeConstants.CUSTOMER.SUBSCRIPTIONS]: '/customer/subscriptions',
    [routeConstants.CUSTOMER.BALANCE]: '/customer/balance'
}

export const scenesMapping = {
    [routeConstants.HOME]: <HomeScene />,
    [routeConstants.LOGIN]: <LoginScene />,
    [routeConstants.SIGNUP]: <SignupScene />,
    [routeConstants.BECOME_SELLER]: <BecomeSellerScene />,
    [routeConstants.BROWSE_SNIPPETS]: <BrowseSnippetsScene />,
    [routeConstants.BROWSE_TEMPLATES]: <BrowseTemplatesScene />,
    [routeConstants.TEMPLATE]: <TemplateScene />,
    [routeConstants.SNIPPET]: <SnippetScene />,
    [routeConstants.ADMIN.CREATE_STAFF_ACCOUNT]: (
        <AdminNode>
            <CreateStaffAccountScene />
        </AdminNode>
    ),
    [routeConstants.ADMIN.PAY_SELLERS]: (
        <AdminNode>
            <PaySellersScene />
        </AdminNode>
    ),
    [routeConstants.STAFF.MANAGE_INCOMING_SNIPPETS]: (
        <StaffNode>
            <ManageIngomingSnippetsScene />
        </StaffNode>
    ),
    [routeConstants.SELLER.PAYMENT]: (
        <SellerNode>
            <SellerPaymentScene />
        </SellerNode>
    ),
    [routeConstants.SELLER.BALANCE]: (
        <SellerNode>
            <SellerBalanceScene />
        </SellerNode>
    ),
    [routeConstants.SELLER.TEMPLATES]: (
        <SellerNode>
            <SellerTemplatesScene />
        </SellerNode>
    ),
    [routeConstants.SELLER.SNIPPETS]: (
        <SellerNode>
            <SellerSnippetsScene />
        </SellerNode>
    ),
    [routeConstants.SELLER.SNIPPET]: (
        <SellerNode>
            <SellerSnippetScene />
        </SellerNode>
    ),
    [routeConstants.SELLER.TEMPLATE]: (
        <SellerNode>
            <SellerTemplateScene />
        </SellerNode>
    ),
    [routeConstants.CUSTOMER.SUBSCRIPTIONS]: (
        <CustomerNode>
            <CustomerSubscriptionsScene />
        </CustomerNode>
    ),
    [routeConstants.CUSTOMER.BALANCE]: (
        <CustomerNode>
            <CustomerBalanceScene />
        </CustomerNode>
    ),
    [NOT_FOUND]: <HomeScene />
}

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export const gotoHomeAction = () => action(routeConstants.HOME)
export const gotoLoginAction = () => action(routeConstants.LOGIN)
export const gotoSignupAction = () => action(routeConstants.SIGNUP)
export const gotoBecomeSellerAction = () => action(routeConstants.BECOME_SELLER)
export const gotoBrowseSnippetsAction = () => action(routeConstants.BROWSE_SNIPPETS)
export const gotoBrowseTemplatesAction = () => action(routeConstants.BROWSE_TEMPLATES)
export const gotoSnippetAction = (id: string) => action(routeConstants.SNIPPET, { id })
export const gotoTemplateAction = (id: string) => action(routeConstants.TEMPLATE, { id })
export const gotoAdminCreateStaffAccountAction = () => action(routeConstants.ADMIN.CREATE_STAFF_ACCOUNT)
export const gotoAdminPaySellersAction = () => action(routeConstants.ADMIN.PAY_SELLERS)
export const gotoStaffManageIncomingSnippetsAction = () => action(routeConstants.STAFF.MANAGE_INCOMING_SNIPPETS)
export const gotoSellerPaymentAction = () => action(routeConstants.SELLER.PAYMENT)
export const gotoSellerBalanceAction = () => action(routeConstants.SELLER.BALANCE)
export const gotoSellerSnippetsAction = () => action(routeConstants.SELLER.SNIPPETS)
export const gotoSellerTemplatesAction = () => action(routeConstants.SELLER.TEMPLATES)
export const gotoSellerSnippetAction = (id: string) => action(routeConstants.SELLER.SNIPPET, { id })
export const gotoSellerTemplateAction = (id: string) => action(routeConstants.SELLER.TEMPLATE, { id })
export const gotoCustomerSubscriptionsAction = () => action(routeConstants.CUSTOMER.SUBSCRIPTIONS)
export const gotoCustomerBalanceAction = () => action(routeConstants.CUSTOMER.BALANCE)

/*
 *         _______. _______  __       _______   ______ .___________.  ______   .______          _______.
 *        /       ||   ____||  |     |   ____| /      ||           | /  __  \  |   _  \        /       |
 *       |   (----`|  |__   |  |     |  |__   |  ,----'`---|  |----`|  |  |  | |  |_)  |      |   (----`
 *        \   \    |   __|  |  |     |   __|  |  |         |  |     |  |  |  | |      /        \   \
 *    .----)   |   |  |____ |  `----.|  |____ |  `----.    |  |     |  `--'  | |  |\  \----.----)   |
 *    |_______/    |_______||_______||_______| \______|    |__|      \______/  | _| `._____|_______/
 */

export const locationSelector = (state: ApplicationState) => state.location

/*
 *    .______     ______     ______   .___________. __    __  .______
 *    |   _  \   /  __  \   /  __  \  |           ||  |  |  | |   _  \
 *    |  |_)  | |  |  |  | |  |  |  | `---|  |----`|  |  |  | |  |_)  |
 *    |   _  <  |  |  |  | |  |  |  |     |  |     |  |  |  | |   ___/
 *    |  |_)  | |  `--'  | |  `--'  |     |  |     |  `--'  | |  |
 *    |______/   \______/   \______/      |__|      \______/  | _|
 */

const { reducer, middleware, enhancer } = connectRoutes(appRoutes)

export { reducer, middleware, enhancer }
