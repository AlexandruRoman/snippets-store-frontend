import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu, { HorizontalMargin, VerticalMargin } from '../../../../_components/AppMenu'
import { locationSelector, gotoSnippetAction, gotoSellerSnippetAction } from '../../../../../_brain/router'
import { LocationState } from 'redux-first-router'
import { api } from '../../../../../_brain/_helpers/api'
import SnippetSquareCard, { ISnippetSquareProps } from '../../../../_components/SnippetSquareCard'
import { authRoleSelector } from '../../../../../_brain/auth/auth'
import ImageSlider from '../../../../_components/ImageSlider'
import Tag from '../../../../_components/Tag'
import ButtonGroupSelect from '../../../../_components/ButtonGroupSelect'
import Comment from '../../../../_components/Comment'
import CommentInput from '../../../../_components/CommentInput'
import MultipleInput from '../../../../_components/MultipleInput'
import SearchBarTags from '../../../../_components/SearchBarTags'
import ProductCard, { IProductCardProps } from '../../../../_components/ProductCard'
import { modalsSetAction, modalsCloseAction, MODALS_IDS } from '../../../../../_brain/modals/modals'
import AddSnippetModal from './_modals/AddSnippetModal'
import { HeaderContainer, SliderContainer, DataContainer } from '../../../../_scenes/TemplateScene/TemplateScene'
import { Input, Icon } from 'semantic-ui-react'
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

class SellerTemplateScene extends Component<IProps, IState> {
    state: IState = {
        comments: [],
        isLoved: false,
        loves: 0,
        views: 0,
        snippets: [],
        description: '',
        images: [],
        name: '',
        seller: '',
        tagIds: [],
        selectedTab: '0',
        commentInput: '',
        allTags: []
    }
    updateTemplate = async (id: string) => {
        const response = await api.put('template/update', {
            id,
            name: this.state.name,
            description: this.state.description,
            tagIds: this.state.tagIds,
            images: this.state.images
        })
    }
    getTemplate = async (id: string) => {
        const response = await api.get('template/' + id)
        console.log(response.data)
        this.setState({
            images: response.data.images,
            name: response.data.name,
            description: response.data.description,
            seller: response.data.seller.user.name,
            tagIds: response.data.templateTags.map((x: any) => x._id)
        })
    }
    getComments = async (id: string) => {
        const response = await api.get('template-comment/get-by-template/' + id)
        console.log(response.data)
        this.setState({
            comments: response.data.map((x: any) => {
                return {
                    text: x.text,
                    client: x.client.user.name
                }
            })
        })
    }
    getCounts = async (id: String) => {
        const response = await api.get('template-impression/get-counts-by-template/' + id)
        console.log(response.data)
        this.setState({ loves: response.data.loves, views: response.data.views })
    }
    deleteSnippet = async (id: string, idTemplate: string) => {
        const response = await api.delete('snippet/' + id)
        this.getSnippets(idTemplate)
    }
    getSnippets = async (id: string) => {
        const response = await api.get('snippet/get-by-template/' + id)
        const snippets = response.data
        for (let snippet of snippets) {
            const countResponse = await api.get('snippet-impression/get-counts-by-snippet/' + snippet._id)
            snippet.views = countResponse.data.views
            snippet.loves = countResponse.data.loves
        }
        this.setState({
            snippets: response.data.map((snippet: any) => {
                const t: IProductCardProps = {
                    img: snippet.images[0] ? snippet.images[0] : '',
                    name: snippet.name,
                    onClick: () => this.props.gotoSnippet(snippet._id),
                    actionItems: [
                        { text: 'EDIT', color: 'blue', action: () => this.props.gotoSnippet(snippet._id) },
                        { text: 'DELETE', color: 'red', action: () => this.deleteSnippet(snippet._id, id) }
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
    getTags = async () => {
        const response = await api.get('template-tag/get-all')
        this.setState({
            allTags: response.data.map((tag: any) => {
                return {
                    key: tag._id,
                    value: tag.name
                }
            })
        })
    }
    tagsSelected = (tags: string[]) => {
        this.setState({ tagIds: tags })
    }
    onSnippetSave = (id: string) => {
        this.getSnippets((this.props.location.payload as any).id)
        this.props.closeModal()
    }
    componentDidMount() {
        const id = (this.props.location.payload as any).id
        this.getTemplate(id)
        this.getComments(id)
        this.getCounts(id)
        this.getSnippets(id)
        this.getTags()
    }
    render() {
        const id = (this.props.location.payload as any).id
        const selectItems = [
            { key: '0', value: 'Description' },
            { key: '1', value: 'Snippets' },
            { key: '2', value: 'Comments (' + this.state.comments.length + ')' }
        ]
        return (
            <Wrapper>
                <MyButton text='Save Template' onClick={() => this.updateTemplate(id)} />
                <VerticalMargin size={16} />
                <HeaderContainer>
                    <SliderContainer>
                        <ImageSlider images={this.state.images} />
                    </SliderContainer>
                    <DataContainer>
                        <div
                            style={{
                                height: '100%',
                                flexDirection: 'column',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <div>
                                    <Input
                                        type='text'
                                        value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', margin: '16px 0' }}>
                                    <div>
                                        <Icon name='eye' />
                                        {this.state.views}
                                    </div>
                                    <HorizontalMargin size={8} />
                                    <div>
                                        <Icon name='heart' />
                                        {this.state.loves}
                                    </div>
                                </div>
                                <SearchBarTags
                                    selected={this.state.tagIds}
                                    tags={this.state.allTags}
                                    onChange={this.tagsSelected}
                                />
                            </div>
                            <MultipleInput items={this.state.images} onChange={x => this.setState({ images: x })} />
                        </div>
                    </DataContainer>
                </HeaderContainer>
                <VerticalMargin size={16} />

                <ButtonGroupSelect
                    items={selectItems}
                    selected={this.state.selectedTab}
                    onChange={x => this.setState({ selectedTab: x })}
                />
                <VerticalMargin size={16} />
                {this.state.selectedTab == '0' && (
                    <div>
                        <textarea
                            style={{ width: '100%' }}
                            value={this.state.description}
                            onChange={e => this.setState({ description: e.target.value })}
                        />
                    </div>
                )}
                {this.state.selectedTab == '1' && (
                    <div>
                        <MyButton
                            text='Add Snippet'
                            onClick={() => this.props.openModal({ id: MODALS_IDS.ADD_SNIPPET })}
                        />
                        <ProductList products={this.state.snippets} />
                    </div>
                )}
                {this.state.selectedTab == '2' && (
                    <div>
                        {this.state.comments.map(x => (
                            <Fragment key={x.text}>
                                <VerticalMargin size={10} />
                                <Comment text={x.text} author={x.client} />
                            </Fragment>
                        ))}
                    </div>
                )}
                <AddSnippetModal idTemplate={id} onSuccess={this.onSnippetSave} />
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SellerTemplateScene)

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
        location: locationSelector(state),
        userRole: authRoleSelector(state)
    }
}

function mapDispatchToProps(dispatch: any, ownProps: IOwnProps): IDispatchProps {
    return bindActionCreators(
        {
            gotoSnippet: gotoSellerSnippetAction,
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

interface IStateProps {
    location: LocationState
    userRole: string
}

interface IDispatchProps {
    gotoSnippet: typeof gotoSellerSnippetAction
    openModal: typeof modalsSetAction
    closeModal: typeof modalsCloseAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IOption {
    key: string
    value: string
}
interface IComment {
    client: string
    text: string
}
interface IState {
    name: string
    seller: string
    images: string[]
    description: string
    tagIds: string[]
    views: number
    loves: number
    comments: IComment[]
    snippets: IProductCardProps[]
    isLoved: boolean
    selectedTab: string
    commentInput: string
    allTags: IOption[]
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
