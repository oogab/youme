import React, { useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

import RoutineItem from '../../components/Routine/RoutineItem/index'
import AddRoutineButton from '../../components/Routine/AddRoutineButton/index'
import Layout from '../../layout/';
import Wrapper from './styles';
import { OPEN_CREATE_ROUTINE_MODAL } from '../../reducers/modal';
import { LOAD_MY_ROUTINES_REQUEST, SET_MODAL_INPUT } from '../../reducers/routine';
import {LOAD_MY_HABITS_REQUEST} from '../../reducers/habit'

function App (props) {
  const dispatch = useDispatch()
  const { myRoutines } = useSelector((state) => state.routine)

  const openCreateRoutine = () => {
    dispatch({
      type: OPEN_CREATE_ROUTINE_MODAL
    })
    dispatch({type : SET_MODAL_INPUT, idx : -1})
  }

  useEffect(() => {
    dispatch({
      type: LOAD_MY_ROUTINES_REQUEST
    })
    dispatch({
      type: LOAD_MY_HABITS_REQUEST
    })
  }, [dispatch])

  return(
    <Layout>
      <Wrapper>
        <div className='menu daily-menu'><h3>루틴 설정</h3><AddRoutineButton onClick={openCreateRoutine} title='루틴 생성'/></div>
        <hr/>
        {
            myRoutines.map((item, idx) => <RoutineItem num={idx} key={item?.id} />)
        }
      </Wrapper>
    </Layout>
  );
}

const mapStateToProps = (state) =>{
    return {
        state
    }
}
export default connect(mapStateToProps)(App);