import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SkeletonForm/SkeletonForm.css';
import './SkeletonEditModal.css';
import { createSkeleton, updateSkeleton } from '../../../store/skeletons';
import { useHistory } from 'react-router-dom';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import Multiselect from 'multiselect-react-dropdown';
import { getUsers, fetchUsers } from '../../../store/users';
import Loading from '../../Loading/Loading';
import modalCloseButton from './modalCloseButton.png';

function SkeletonEditModal ({skellie, handleModalClose, handleSkellieUpdate}) {
  const [title, setTitle] = useState(skellie.title);
  const [prompt, setPrompt] = useState(skellie.prompt)
  const [maxBones, setMaxBones] = useState(skellie.maxBones);
  const [maxCollaborators, setMaxCollaborators] = useState(skellie.maxCollaborators);
  const [tags, setTags] = useState(skellie.tags);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const options = users?.filter(user => user._id !== currentUser._id).map(user => ({username: user.username, _id: user._id}));
  const [selectedValue, setSelectedValue] = useState(skellie.collaborators);
  const selectedList = [];
  // const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [ modalStatus, setModalStatus ] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoaded(true);
  }, [modalStatus])


  
  const onSelect =(selectedList, selectedItem) => {
    selectedValue.push(selectedItem)
    setSelectedValue(selectedValue)
  }
  
  const onRemove = (selectedList, removedItem) => {
    const index = selectedValue.indexOf(removedItem)
    selectedValue.splice(index, 1)
    setSelectedValue(selectedValue)
  }
  
  const update = (e, field) => {
    let setState;
    const value = e.currentTarget.value;
    const newErrors = {...errors};
    switch (field) {
      case 'title':
        setState = setTitle;
        if (value.length > 100) {
          newErrors[field] = 'Skeleton title is required and must be between 1 and 100 characters';
        } else if (value.length < 1){
          newErrors[field] = 'Skeleton title is required and must be between 1 and 100 characters';
        } else {
          delete newErrors[field];
        }
        setErrors(newErrors);
        break;
      case 'prompt':
        setState = setPrompt;
        if (value.length > 150) {
          newErrors[field] = 'Prompt must be less than 150 characters';
        } else {
          delete newErrors[field];
        }
        setErrors(newErrors);
        break;
      case 'maxBones':
        setState = setMaxBones;
        let num = parseInt(value);
        if (num < 5) {
          newErrors[field] = 'Skeleton should have at least 5 bones and no more than 50 bones';
        } else if (num > 50) {
          newErrors[field] = 'Skeleton should have at least 5 bones and no more than 50 bones';
        } else {
          delete newErrors[field];
        }
        setErrors(newErrors);
        break;
      case 'maxCollaborators':
        setState = setMaxCollaborators;
        let numCollab = parseInt(value);
        if (numCollab < 1) {
          newErrors[field] = 'Skeleton should have at least 1 collaborator and no more than 50 collaborators';
        } else if (numCollab > 50) {
          newErrors[field] = 'Skeleton should have at least 1 collaborator and no more than 50 collaborators';
        } else {
          delete newErrors[field];
        }
        setErrors(newErrors);
        break;
      case 'tags':
        setState = setTags;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    setState(value);
  }

  const skeletonSubmit = (e) => {
    e.preventDefault();
    const skeleton = {
      title,
      prompt,
      maxBones,
      maxCollaborators,
      collaborators: selectedValue.map(value=> value._id)
    };
    if (Object.values(errors).length === 0) {
      dispatch(updateSkeleton(skellie._id, skeleton))
      handleModalClose();
    }
    // .then((res) => {history.push(`/skeletons/${res._id}`)})
  }

  const handleClose = () => {
    handleModalClose();
  }

   
  if (!loaded) {
    return (
      <Loading />
    )
  } else {
    return (
      <>  
        <div className='edit-modal-background' onClick={handleClose}></div>
        <div className='edit-modal' id="edit-skeleton-form">
            <img src={modalCloseButton} className='resModalCloseBtn' onClick={handleClose} />
          <form className="edit-modal-form" onSubmit={skeletonSubmit}>
            <h2 className='form-title'>Edit Skeleton</h2>
            <div className="errors">{errors?.title}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Title:
                </h2>
              </span>
              <br/>
              <input type="text"
                value={title || ''}
                onChange={e => update(e,'title')}
                placeholder="Title"
                className='edit-skellie-input'
              />
            </label>
            <div className="errors">{errors?.prompt}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Prompt (optional):
                </h2>
              </span>
              <br/>
              <textarea
                value={prompt || ''}
                onChange={e => update(e, 'prompt')}
                placeholder="Prompt"
                className='edit-skellie-input'
              />
            </label>
            <div className="errors">{errors?.maxBones}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Max Amount of Bones(Updates):
                </h2>
              </span>
              <br/>
              <input type="number"
                value={maxBones || ''}
                onChange={e => update(e, 'maxBones')}
                placeholder="At least 5 bones"
                className='edit-skellie-input'
              />
            </label>
            <div className="errors">{errors?.maxCollaborators}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Max Amount of Collaborators:
                </h2>
              </span>
              <br/>
              <input type="number"
                value={maxCollaborators || ''}
                onChange={e => update(e, 'maxCollaborators')}
                placeholder="Max Collaborators"
                className='edit-skellie-input'
              />
            </label>
            <div className="errors">{errors?.collaborators}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Collaborators:
                </h2>
              </span>
              <br/>
            </label>
            <Multiselect
              options={options}
              selectedValues={selectedValue} 
              onSelect={onSelect}
              onRemove={onRemove} 
              displayValue="username" 
              selectionLimit={maxCollaborators}
              id="edit-collaborator-select"
              />
    
            {/* <div className="errors">{errors?.tags}</div>
            <label>
              <span className='edit-skellie-label'>
                <h2 className='edit-skellie-label-text'>
                  Tags:
                </h2>
              </span>
              <br/>
                <input type="word"
                value={tags || ''}
                onChange={update('tags')}
                placeholder="Tags"
                className='edit-skellie-input'>
                </input>
            </label> */}
    
            <input
              onClick={e => skeletonSubmit(e)}
              className='skellie-form-submit-button'
              id="edit-skellie-submit-button"
              type="submit"
              value="Save Changes"
              disabled={!title || !maxBones || !maxCollaborators || !tags }
            />
          
    
          </form>
        </div>
      </>
    );

  }

}

export default SkeletonEditModal;