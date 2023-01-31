import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SkeletonForm.css';
import { PromptList } from './PromptList';
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
  const dispatch = useDispatch();
  const options = users?.filter(user => user._id !== currentUser._id).map(user => ({name: user.username, id: user._id}));
  const selectedValue = [];
  const selectedList = [];
  const selectedCollaborators = [];
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    Promise.all([
      dispatch(fetchUsers()),
    ]).then(()=>{
      setLoaded(true);
    })
  }, [])

  const handlePromptClick = () => {
    setPrompt(PromptList[Math.floor(Math.random()*PromptList.length)])
  }

  const onSelect =(selectedList, selectedItem) => {
    selectedCollaborators.push(selectedItem.id)
  }
  
  const onRemove = (selectedList, removedItem) => {
    const index = selectedCollaborators.indexOf(removedItem.id)
    selectedCollaborators.splice(index, 1)
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

  
  
  const skeletonSubmit = (e, errors) => {
    e.preventDefault();
    const skeleton = {
      title,
      prompt,
      maxBones,
      maxCollaborators,
      collaborators: selectedCollaborators
    };
    
    if (errors && Object.values(errors).length === 0) {
      dispatch(createSkeleton(skeleton))
        .then((res) => {history.push(`/skeletons/${res._id}`)})
    }
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
              // maxLength={100}
              onChange={e => update(e, 'title')}
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
            <textarea
              value={prompt || ''}
              onChange={e=> update(e, 'prompt')}
              placeholder="Prompt"
              className='skellie-input'
            />
          </label>
          <br />
          <button id="random-prompt-button" onClick={handlePromptClick}>
              Generate a Random Prompt
          </button>
          <p id="credit-to-website">Most phrases by <a id="random-word-link" href='https://randomword.com/sentence' target="_blank">RandomWord</a>, some by Daphne</p>
          <div className="errors">{errors?.maxBones}</div>
          <label>
            <span className='skellie-label'>
              <h2 className='skellie-label-text'>
                Max Amount of Bones (Updates):
              </h2>
            </span>
            <br/>
            <input type="number"
              value={maxBones || ''}
              onChange={e => update(e, 'maxBones')}
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
              onChange={e => update(e, 'maxCollaborators')}
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
            id="collaborator-select"
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
            onClick={e => skeletonSubmit(e, errors)}
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