import './Loading.css';
import exquisDude from '../../assets/profile_page/exquis_profile_icon.png'

export const Loading = () => {

  return (
    <div className='LoadingDiv'>
      <img src={exquisDude} id="exquisDudeLoader"/>
      <p className='loadingText'>Loading ...</p>
    </div>
  )
}

export default Loading;