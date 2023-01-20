import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SkeletonForm.css';
import { createSkeleton } from '../../../store/skeletons';
import { useHistory } from 'react-router-dom';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import Multiselect from 'multiselect-react-dropdown';
import { getUsers, fetchUsers } from '../../../store/users';
import Loading from '../../Loading/Loading';

function SkeletonForm () {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('')
  const [maxBones, setMaxBones] = useState('');
  const [maxCollaborators, setMaxCollaborators] = useState('');
  const [tags, setTags] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(getUsers);
  const errors = useSelector(state => state.errors.skeletons);
  const dispatch = useDispatch();
  const options = users?.filter(user => user._id !== currentUser._id).map(user => ({name: user.username, id: user._id}));
  const selectedValue = [];
  const selectedList = [];
  const selectedCollaborators = [];


  useEffect(() => {
    Promise.all([
      dispatch(fetchUsers()),
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])

  
  const onSelect =(selectedList, selectedItem) => {
    selectedCollaborators.push(selectedItem.id)
   
  }
  
  const onRemove = (selectedList, removedItem) => {
    const index = selectedCollaborators.indexOf(removedItem.id)
    selectedCollaborators.splice(index, 1)
    
  }
  

  const update = field => {
    let setState;

    switch (field) {
      case 'title':
        setState = setTitle;
        break;
      case 'prompt':
        setState = setPrompt;
        break;
      case 'maxBones':
        setState = setMaxBones;
        break;
      case 'maxCollaborators':
        setState = setMaxCollaborators;
        break;
      case 'tags':
        setState = setTags;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const skeletonSubmit = e => {
    e.preventDefault();
    const skeleton = {
      title,
      prompt,
      maxBones,
      maxCollaborators,
      collaborators: selectedCollaborators
    };

    dispatch(createSkeleton(skeleton))
    .then((res) => {history.push(`/skeletons/${res._id}`)})

  }

   
  if (!loaded) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className='form-container' id="new-skeleton-form">
        <form className="session-form" onSubmit={skeletonSubmit}>
          <h2 className='form-title'>New Skeleton</h2>
          <div className="errors">{errors?.title}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Title:
              </h2>
            </span>
            <br/>
            <input type="text"
              value={title || ''}
              onChange={update('title')}
              placeholder="Title"
              className='skellie-input'
            />
          </label>
          <div className="errors">{errors?.prompt}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Prompt (optional):
              </h2>
            </span>
            <br/>
            {/* <input type="text"
              value={prompt}
              onChange={update('prompt')}
              placeholder="Prompt"
              className='skellie-input'
            /> */}
            <textarea
              value={prompt || ''}
              onChange={update('prompt')}
              placeholder="Prompt"
              className='skellie-input'
            />
          </label>
          <div className="errors">{errors?.maxBones}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Max Amount of Bones(Updates):
              </h2>
            </span>
            <br/>
            <input type="number"
              value={maxBones || ''}
              onChange={update('maxBones')}
              placeholder="At least 5 bones"
              className='skellie-input'
            />
          </label>
          <div className="errors">{errors?.maxCollaborators}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Max Amount of Collaborators:
              </h2>
            </span>
            <br/>
            <input type="number"
              value={maxCollaborators || ''}
              onChange={update('maxCollaborators')}
              placeholder="Max Collaborators"
              className='skellie-input'
            />
          </label>
          <div className="errors">{errors?.collaborators}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
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
            displayValue="name" 
            selectionLimit={maxCollaborators}
            />
  
          {/* <div className="errors">{errors?.tags}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Tags:
              </h2>
            </span>
            <br/>
              <input type="word"
              value={tags || ''}
              onChange={update('tags')}
              placeholder="Tags"
              className='skellie-input'>
              </input>
          </label> */}
  
          <input
            onClick={e => skeletonSubmit(e)}
            className='skellie-form-submit-button'
            type="submit"
            value="Start a New Skellie :)"
            disabled={!title || !maxBones || !maxCollaborators || !tags }
          />
  
        </form>
      </div>
    );

  }

}

export default SkeletonForm;