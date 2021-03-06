import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ProductCard, { IProductCardProps } from '../../../../_components/ProductCard'
import { gotoSellerSnippetAction } from '../../../../../_brain/router'
import { api } from '../../../../../_brain/_helpers/api'
import ProductList from '../../../../_components/ProductList'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class SellerSnippetsScene extends Component<IProps, IState> {
    state: IState = {
        snippets: []
    }
    deleteSnippet = async (id: string) => {
        const response = await api.delete('snippet/' + id)
        this.getSnippets()
    }
    getSnippets = async () => {
        const response = await api.get('snippet/get-mine')
        const snippets = response.data
        for (let snippet of snippets) {
            const countResponse = await api.get('snippet-impression/get-counts-by-snippet/' + snippet._id)
            snippet.views = countResponse.data.views
            snippet.loves = countResponse.data.loves
        }
        this.setState({
            snippets: response.data.map((snippet: any) => {
                const t: IProductCardProps = {
                    id: snippet._id,
                    img: snippet.images[0] ? snippet.images[0] : '',
                    name: snippet.name,
                    onClick: () => this.props.gotoSnippet(snippet._id),
                    actionItems: [
                        { text: 'EDIT', color: 'blue', action: () => this.props.gotoSnippet(snippet._id) },
                        { text: 'DELETE', color: 'red', action: () => this.deleteSnippet(snippet._id) }
                    ],
                    seller: snippet.seller.user.name,
                    views: snippet.views,
                    loves: snippet.loves,
                    status: snippet.status.name
                }
                return t
            })
        })
    }

    componentDidMount() {
        this.getSnippets()
    }
    render() {
        return (
            <Wrapper>
                <ProductList products={this.state.snippets} />
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SellerSnippetsScene)

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
            gotoSnippet: gotoSellerSnippetAction
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
    gotoSnippet: typeof gotoSellerSnippetAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {
    snippets: IProductCardProps[]
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
