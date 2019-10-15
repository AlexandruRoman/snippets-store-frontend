import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu from '../../_components/AppMenu'
import { api } from '../../../_brain/_helpers/api'
import SearchBarTags from '../../_components/SearchBarTags'
import SnippetSquareCard, { ISnippetSquareProps } from '../../_components/SnippetSquareCard'
import { gotoTemplateAction } from '../../../_brain/router'
import ProductCard, { IProductCardProps } from '../../_components/ProductCard'
import Container from '../../_components/Container'
import ProductList from '../../_components/ProductList'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class BrowseTemplatesScene extends Component<IProps, IState> {
    state: IState = {
        tags: [],
        selectedTags: [],
        templates: []
    }
    getTags = async () => {
        const response = await api.get('template-tag/get-all')
        this.setState({
            tags: response.data.map((tag: any) => {
                return {
                    key: tag._id,
                    value: tag.name
                }
            })
        })
    }
    tagsSelected = (tags: string[]) => {
        this.setState({ selectedTags: tags })
        this.getTemplates()
    }
    getTemplates = async () => {
        const response = await api.post('template/get-filtered', {
            tagIds: this.state.selectedTags,
            page: 1,
            perPage: 10
        })
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
                    actionItems: [{ text: 'VIEW', color: 'blue', action: () => this.props.gotoTemplate(template._id) }],
                    seller: template.seller.user.name,
                    views: template.views,
                    loves: template.loves
                }
                return t
            })
        })
    }

    componentDidMount() {
        this.getTags()
        this.getTemplates()
    }
    render() {
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <SearchBarTags
                        selected={this.state.selectedTags}
                        tags={this.state.tags}
                        onChange={this.tagsSelected}
                    />
                    <ProductList products={this.state.templates} />
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(BrowseTemplatesScene)

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
            gotoTemplate: gotoTemplateAction
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
    gotoTemplate: typeof gotoTemplateAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IOption {
    key: string
    value: string
}
interface IState {
    tags: IOption[]
    selectedTags: string[]
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
