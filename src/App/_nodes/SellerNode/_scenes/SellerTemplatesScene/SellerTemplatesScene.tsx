import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getRandomSnippet } from '../../../../../_assets/snippets'
import ProductCard, { IProductCardProps } from '../../../../_components/ProductCard'
import { gotoSellerTemplateAction } from '../../../../../_brain/router'
import { api } from '../../../../../_brain/_helpers/api'
import AddTemplateModal from './_modals/AddTemplateModal'
import { modalsSetAction, MODALS_IDS, modalsCloseAction } from '../../../../../_brain/modals/modals'
import ProductList from '../../../../_components/ProductList'
import MyButton from '../../../../_components/MyButton'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class SellerTemplatesScene extends Component<IProps, IState> {
    state: IState = {
        templates: []
    }
    onTemplateSave = (id: string) => {
        this.getTemplates()
        this.props.closeModal()
    }
    deleteTemplate = async (id: string) => {
        const response = await api.delete('template/' + id)
        this.getTemplates()
    }
    getTemplates = async () => {
        const response = await api.get('template/get-mine')
        const templates = response.data
        for (let template of templates) {
            const countResponse = await api.get('template-impression/get-counts-by-template/' + template._id)
            template.views = countResponse.data.views
            template.loves = countResponse.data.loves
        }
        this.setState({
            templates: response.data.map((template: any) => {
                const t: IProductCardProps = {
                    img: template.images[0] ? template.images[0] : '',
                    name: template.name,
                    onClick: () => this.props.gotoTemplate(template._id),
                    actionItems: [
                        { text: 'EDIT', color: 'blue', action: () => this.props.gotoTemplate(template._id) },
                        { text: 'DELETE', color: 'red', action: () => this.deleteTemplate(template._id) }
                    ],
                    seller: template.seller.user.name,
                    views: template.views,
                    loves: template.loves
                }
                return t
            })
        })
    }

    componentDidMount() {
        this.getTemplates()
    }
    render() {
        return (
            <Wrapper>
                <MyButton onClick={() => this.props.openModal({ id: MODALS_IDS.ADD_TEMPLATE })} text='Add Template' />
                <ProductList products={this.state.templates} />
                <AddTemplateModal onSuccess={this.onTemplateSave} />
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SellerTemplatesScene)

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
            gotoTemplate: gotoSellerTemplateAction,
            openModal: modalsSetAction,
            closeModal: modalsCloseAction
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
    gotoTemplate: typeof gotoSellerTemplateAction
    openModal: typeof modalsSetAction
    closeModal: typeof modalsCloseAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {
    templates: IProductCardProps[]
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
