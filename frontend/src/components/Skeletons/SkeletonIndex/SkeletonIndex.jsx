import IndexSkeletonDisplay from "../SkeletonDisplay/IndexSkeletonDisplay/IndexSkeletonDisplay";
import './SkeletonIndex.css'

const SkeletonIndex = ({skellieProps}) => {

  return (
     <>
      <div className='index-page'>
        <div class="index-content">
            <IndexSkeletonDisplay component={skellieProps} />
        </div>
      </div>
    </>
  )


}
export default SkeletonIndex;