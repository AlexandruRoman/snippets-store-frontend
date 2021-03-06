import React, { Component } from 'react'
import styled from 'styled-components'
import BasicModal from '../../../../../_components/BasicModal'
import { MODALS_IDS } from '../../../../../../_brain/modals/modals'
import { api } from '../../../../../../_brain/_helpers/api'
import SearchBarTags from '../../../../../_components/SearchBarTags'
import MultipleInput from '../../../../../_components/MultipleInput'
import { Input, TextArea, Form, Button } from 'semantic-ui-react'
import MyButton from '../../../../../_components/MyButton'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

export default class AddTemplateModal extends Component<IProps, IState> {
    state: IState = {
        description: '',
        images: [''],
        name: '',
        selectedTags: [],
        tags: []
    }
    addTemplate = async () => {
        const response = await api.post('template/add', {
            name: this.state.name,
            description: this.state.description,
            tagIds: this.state.selectedTags,
            images: this.state.images
        })
        console.log(response.data)
        this.props.onSuccess(response.data._id)
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
    }
    componentDidMount() {
        this.getTags()
    }
    render() {
        return (
            <Wrapper>
                <BasicModal id={MODALS_IDS.ADD_TEMPLATE} header='Add a new template'>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <Input
                                type='text'
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                                placeholder='Enter name...'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <TextArea
                                value={this.state.description}
                                onChange={e => this.setState({ description: e.currentTarget.value })}
                                placeholder='Enter description...'
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Tags</label>
                            <SearchBarTags
                                selected={this.state.selectedTags}
                                tags={this.state.tags}
                                onChange={this.tagsSelected}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Images</label>
                            <MultipleInput onChange={x => this.setState({ images: x })} items={this.state.images} />
                        </Form.Field>
                        <MyButton onClick={this.addTemplate} text='Add Template' />
                    </Form>
                </BasicModal>
            </Wrapper>
        )
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    onSuccess: (id: string) => void
}

interface IOption {
    key: string
    value: string
}
interface IState {
    tags: IOption[]
    selectedTags: string[]
    name: string
    description: string
    images: string[]
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
