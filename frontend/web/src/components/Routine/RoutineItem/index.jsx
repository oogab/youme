import React from 'react';
import Wrapper from './styles'
import RoutineItemDetail from '../RoutineItemDetail/index';
import {Settings, Save, Delete,AddCircle} from '@material-ui/icons'
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Grid
} from '@material-ui/core';
import { OPEN_ROUTINE_MODAL, OPEN_CREATE_ROUTINE_MODAL, SET_ALERT_MODAL_FUNCTION,OPEN_ALERT_MODAL} from '../../../reducers/modal';
import { SET_CHOOSED_ROUTINE, DELETE_ROUTINE_REQUEST, SET_MODAL_INPUT, SET_ORDER_REQUEST} from '../../../reducers/routine';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'
function App(props){
  const dispatch = useDispatch()
  const { myRoutines } = useSelector((state) => state.routine)
    const { num } = props;
    function openRoutine(){
      dispatch({type: SET_CHOOSED_ROUTINE, idx:num});
      dispatch({
        type: OPEN_ROUTINE_MODAL
      });
    }
    function openCreateRoutine(){
      dispatch({type: OPEN_CREATE_ROUTINE_MODAL});
      dispatch({type: SET_MODAL_INPUT, idx: num});
    }
    function deleteRoutines(){
      dispatch({type: DELETE_ROUTINE_REQUEST, id:myRoutines[num].id, idx:num});
    }

    function setDeleteRoutines(){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: deleteRoutines})
      dispatch({type: OPEN_ALERT_MODAL, message:'루틴을 삭제하시겠습니까?'})
    }

    function saveRoutines(){
      dispatch({type:SET_ORDER_REQUEST, habits: myRoutines[num].RoutinizedHabits, idx:num})
    }
    function setSaveRoutines(){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: saveRoutines})
      dispatch({type: OPEN_ALERT_MODAL, message:'순서를 저장하시겠습니까?'})
    }
    return(
        <Wrapper>
            <Accordion className="panel routine-item">
                <AccordionSummary
                  className="panel-summary"
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="title">{myRoutines[num]?.name}</h3>
                </AccordionSummary>
                <AccordionDetails className ='details'>
                <DndProvider backend={TouchBackend} options={{enableMouseEvents :true}}>
                  <RoutineItemDetail num = {num} routinizedHabits={myRoutines[num].RoutinizedHabits}/>
                </DndProvider>
                  
                  <Grid container className='button-div'>
                    <Grid item xs={3}>
                      <IconButton color='primary' onClick={openCreateRoutine} className="btn">
                        <Settings className="btn modify-btn" id='setting-btn'></Settings>
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton color='primary' onClick ={setDeleteRoutines} className="btn">
                      <Delete className='btn modify-btn' id='delete-btn'></Delete>
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton color='primary' onClick ={setSaveRoutines} className="btn">
                      <Save className="btn modify-btn" id='save-btn'></Save>
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                    <IconButton color='primary' onClick={openRoutine} className="btn">
                    <AddCircle className='btn modify-btn' id='add-btn'>+</AddCircle>
                    </IconButton>
                    </Grid>
                    </Grid>
                </AccordionDetails>
              </Accordion>
        </Wrapper>
    );
}
const mapStateToProps = (state) =>{
  return {
      state
  }
}
export default connect(mapStateToProps)(App);
