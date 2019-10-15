import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu, { VerticalMargin } from '../../_components/AppMenu'
import { api } from '../../../_brain/_helpers/api'
import SearchBarTags from '../../_components/SearchBarTags'
import SnippetSquareCard, { ISnippetSquareProps } from '../../_components/SnippetSquareCard'
import { gotoSnippetAction } from '../../../_brain/router'
import Container from '../../_components/Container'
import SquareCardList from '../../_components/SquareCardList'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class BrowseSnippetsScene extends Component<IProps, IState> {
    state: IState = {
        tags: [],
        selectedTags: [],
        snippets: []
    }
    getTags = async () => {
        const response = await api.get('snippet-tag/get-all')
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
        this.getSnippets()
    }
    getSnippets = async () => {
        const response = await api.post('snippet/get-filtered', {
            tagIds: this.state.selectedTags,
            page: 1,
            perPage: 10
        })
        this.setState({
            snippets: response.data.map((snippet: any) => {
                return {
                    img: snippet.images[0] ? snippet.images[0] : '',
                    name: snippet.name,
                    onClick: () => this.props.gotoSnippet(snippet._id)
                }
            })
        })
    }

    componentDidMount() {
        this.getTags()
        this.getSnippets()
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
                    <VerticalMargin size={20} />
                    <SquareCardList items={this.state.snippets} />
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(BrowseSnippetsScene)

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
            gotoSnippet: gotoSnippetAction
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
    gotoSnippet: typeof gotoSnippetAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IOption {
    key: string
    value: string
}
interface IState {
    tags: IOption[]
    selectedTags: string[]
    snippets: ISnippetSquareProps[]
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
