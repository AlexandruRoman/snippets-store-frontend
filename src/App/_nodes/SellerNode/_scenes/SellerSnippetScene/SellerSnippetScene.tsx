import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu, { HorizontalMargin, VerticalMargin } from '../../../../_components/AppMenu'
import Highlight from 'react-highlight'
import { getRandomSnippet } from '../../../../../_assets/snippets'
import { locationSelector } from '../../../../../_brain/router'
import { LocationState } from 'redux-first-router'
import { api } from '../../../../../_brain/_helpers/api'
import { authRoleSelector } from '../../../../../_brain/auth/auth'
import ImageSlider from '../../../../_components/ImageSlider'
import Tag from '../../../../_components/Tag'
import PreviewCode from '../../../../_components/PreviewCode'
import ButtonGroupSelect from '../../../../_components/ButtonGroupSelect'
import Comment from '../../../../_components/Comment'
import CommentInput from '../../../../_components/CommentInput'
import MultipleInput from '../../../../_components/MultipleInput'
import SearchBarTags from '../../../../_components/SearchBarTags'
import { HeaderContainer, SliderContainer, DataContainer } from '../../../../_scenes/TemplateScene/TemplateScene'
import { Input, Icon } from 'semantic-ui-react'
import MyButton from '../../../../_components/MyButton'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class SellerSnippetScene extends Component<IProps, IState> {
    state: IState = {
        comments: [],
        isLoved: false,
        loves: 0,
        views: 0,
        description: '',
        images: [],
        name: '',
        seller: '',
        tagIds: [],
        allTags: [],
        templateName: '',
        code: '',
        preview: true,
        selectedTab: '0',
        commentInput: ''
    }
    updateSnippet = async (id: string) => {
        const response = await api.put('snippet/update', {
            id,
            name: this.state.name,
            code: this.state.code,
            description: this.state.description,
            tagIds: this.state.tagIds,
            images: this.state.images
        })
    }
    getSnippet = async (id: string) => {
        const response = await api.get('snippet/' + id)
        console.log(response.data)
        this.setState({
            images: response.data.images,
            name: response.data.name,
            description: response.data.description,
            seller: response.data.seller.user.name,
            templateName: response.data.template.name,
            tagIds: response.data.snippetTags.map((x: any) => x._id),
            code: response.data.code
        })
    }
    getComments = async (id: string) => {
        const response = await api.get('snippet-comment/get-by-snippet/' + id)
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
        const response = await api.get('snippet-impression/get-counts-by-snippet/' + id)
        console.log(response.data)
        this.setState({ loves: response.data.loves, views: response.data.views })
    }
    getTags = async () => {
        const response = await api.get('snippet-tag/get-all')
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
    componentDidMount() {
        const id = (this.props.location.payload as any).id
        this.getTags()
        this.getSnippet(id)
        this.getComments(id)
        this.getCounts(id)
    }
    render() {
        const id = (this.props.location.payload as any).id
        const selectItems = [
            { key: '0', value: 'Description' },
            { key: '1', value: 'Comments (' + this.state.comments.length + ')' }
        ]
        return (
            <Wrapper>
                <MyButton text='Save Snippet' onClick={() => this.updateSnippet(id)} />
                <VerticalMargin size={24} />
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
                                <div style={{ display: 'flex', marginTop: '16px' }}>
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
                                <VerticalMargin size={16} />
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
                <VerticalMargin size={48} />

                <MyButton text='Description' isActive isFluid onClick={() => 0} />
                <div style={{ display: 'flex', margin: '16px 0' }}>
                    <textarea
                        style={{ width: '100%' }}
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                    />
                </div>
                <VerticalMargin size={48} />

                <MyButton text={!this.state.preview ? 'Code' : 'Preview'} isActive isFluid onClick={() => 0} />
                <PreviewCode
                    preview={this.state.preview}
                    code={this.state.code}
                    onChange={code => this.setState({ code })}
                />
                <VerticalMargin size={16} />
                <MyButton
                    text={this.state.preview ? 'Code' : 'Preview'}
                    onClick={() => this.setState({ preview: !this.state.preview })}
                />
                <VerticalMargin size={48} />

                <MyButton text='Comments' isActive isFluid onClick={() => 0} />
                <VerticalMargin size={10} />

                <div>
                    <VerticalMargin size={10} />

                    {this.state.comments.map(x => (
                        <Fragment key={x.text}>
                            <VerticalMargin size={10} />
                            <Comment text={x.text} author={x.client} />
                        </Fragment>
                    ))}
                </div>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SellerSnippetScene)

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

interface IStateProps {
    location: LocationState
    userRole: string
}

interface IDispatchProps {}

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
    templateName: string
    tagIds: string[]
    allTags: IOption[]
    views: number
    loves: number
    comments: IComment[]
    isLoved: boolean
    code: string
    preview: boolean
    selectedTab: string
    commentInput: string
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
