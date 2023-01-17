import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SkeletonForm.css';

function SkeletonForm () {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('')
  const [maxBones, setMaxBones] = useState(4);
  const [maxCollaborators, setMaxCollaborators] = useState(1);
  const [tags, setTags] = useState([]);

  const currentUser = useSelector(state => state.session.user)
  const errors = useSelector(state => state.errors.skeletons);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSessionErrors());
  //   };
  // }, [dispatch]);

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
      tags
    };

    // dispatch(create(skeletono)));

  }

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
            value={title}
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
            value={prompt}
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
          <input type="nummber"
            value={maxBones}
            onChange={update('maxBones')}
            placeholder="Max Bones"
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
          <input type="nummber"
            value={maxCollaborators}
            onChange={update('maxCollaborators')}
            placeholder="Max Collaborators"
            className='skellie-input'
          />
        </label>
        <input
          className='skellie-form-submit-button'
          type="submit"
          value="Start a New Skellie :)"
          disabled={!title || !maxBones || !maxCollaborators || !tags }
        />
      </form>
    </div>
  );
}

export default SkeletonForm;