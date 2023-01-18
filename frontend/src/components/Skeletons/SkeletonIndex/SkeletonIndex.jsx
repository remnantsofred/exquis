import IndexSkeletonDisplay from "../SkeletonDisplay/IndexSkeletonDisplay/IndexSkeletonDisplay";
import './SkeletonIndex.css';
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from "../../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useParams, withRouter, useHistory } from 'react-router-dom';
import { getSkeletons, fetchSkeletons } from "../../../store/skeletons";
import Loading from '../../Loading/Loading';

const SkeletonIndex = ({skellieProps}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skeletons = useSelector(getSkeletons);
  const [loaded, setLoaded] = useState(false);
  let history = useHistory();

  useEffect(() => {
    // console.log(paramsMap, "paramsMap");
    // console.log(history, "history");
    // console.log(history.location.search, "history.location.search");
    // const paramsMap = getParams(history.location.search);
    Promise.all([
      dispatch(fetchSkeletons())
    ]).then(()=>{
      setLoaded(true);
    })
  },[]);

  // useEffect(() => {
  //   if (loaded) {
  //     setLoaded(false);
  //     const paramsMap = getParams(history.location.search)
  //     dispatch(fetchSkeletons()).then(()=>setLoaded(true))
  //   }
  // }, [history.location.search]);


  const getParams = (params) => {
    const paramsString = params.slice(1)
    const paramsArray = paramsString.split('&')
    const paramsMap = {};
    for (const param of paramsArray){
      const [key, value] = param.split('=')
      paramsMap[key] = value
    }
    return paramsMap;
  }

  if (!loaded) {
    return (
      <Loading />
    )

  } else {
    return (
      <>
        <div className='index-page'>
          <div className="index-content">
              <IndexSkeletonDisplay 
                component={skellieProps} 
                skeletons={skeletons} />
          </div>
        </div>
      </>
    )
  }

}
export default SkeletonIndex;