import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios'
import {
  ADD_CHALLENGE_REQUEST,
  ADD_CHALLENGE_SUCCESS,
  ADD_CHALLENGE_FAILURE,
  /*********************************************************** */
  LOAD_CHALLENGES_REQUEST,
  LOAD_CHALLENGES_SUCCESS,
  LOAD_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_MY_CHALLENGES_REQUEST,
  LOAD_MY_CHALLENGES_SUCCESS,
  LOAD_MY_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_MY_CREATE_CHALLENGES_REQUEST,
  LOAD_MY_CREATE_CHALLENGES_SUCCESS,
  LOAD_MY_CREATE_CHALLENGES_FAILURE,
  /*********************************************************** */
  UPLOAD_CHALLENGE_IMAGE_REQUEST,
  UPLOAD_CHALLENGE_IMAGE_SUCCESS,
  UPLOAD_CHALLENGE_IMAGE_FAILURE,
  /*********************************************************** */
  LOAD_NEW_CHALLENGES_REQUEST,
  LOAD_NEW_CHALLENGES_SUCCESS,
  LOAD_NEW_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_REC_CHALLENGES_REQUEST,
  LOAD_REC_CHALLENGES_SUCCESS,
  LOAD_REC_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_WORKOUT_CHALLENGES_REQUEST,
  LOAD_WORKOUT_CHALLENGES_SUCCESS,
  LOAD_WORKOUT_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_STUDY_CHALLENGES_REQUEST,
  LOAD_STUDY_CHALLENGES_SUCCESS,
  LOAD_STUDY_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_LIFE_CHALLENGES_REQUEST,
  LOAD_LIFE_CHALLENGES_SUCCESS,
  LOAD_LIFE_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_MEAL_CHALLENGES_REQUEST,
  LOAD_MEAL_CHALLENGES_SUCCESS,
  LOAD_MEAL_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_ABILITY_CHALLENGES_REQUEST,
  LOAD_ABILITY_CHALLENGES_SUCCESS,
  LOAD_ABILITY_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_HOBBY_CHALLENGES_REQUEST,
  LOAD_HOBBY_CHALLENGES_SUCCESS,
  LOAD_HOBBY_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_ASSET_CHALLENGES_REQUEST,
  LOAD_ASSET_CHALLENGES_SUCCESS,
  LOAD_ASSET_CHALLENGES_FAILURE,
  /*********************************************************** */
  LOAD_CHALLENGE_REQUEST,
  LOAD_CHALLENGE_SUCCESS,
  LOAD_CHALLENGE_FAILURE,
  /*********************************************************** */
  PARTICIPATE_CHALLENGE_REQUEST,
  PARTICIPATE_CHALLENGE_SUCCESS,
  PARTICIPATE_CHALLENGE_FAILURE,
  /*********************************************************** */
  CERTIFY_CHALLENGE_REQUEST,
  CERTIFY_CHALLENGE_SUCCESS,
  CERTIFY_CHALLENGE_FAILURE,
  /*********************************************************** */
  LIKE_CHALLENGE_REQUEST,
  LIKE_CHALLENGE_SUCCESS,
  LIKE_CHALLENGE_FAILURE,
  /*********************************************************** */
  UNLIKE_CHALLENGE_REQUEST,
  UNLIKE_CHALLENGE_SUCCESS,
  UNLIKE_CHALLENGE_FAILURE,
  /*********************************************************** */
  SEARCH_CHALLENGE_REQUEST,
  SEARCH_CHALLENGE_SUCCESS,
  SEARCH_CHALLENGE_FAILURE,
  /*********************************************************** */
  DELETE_CHALLENGE_PARTICIPATION_REQUEST,
  DELETE_CHALLENGE_PARTICIPATION_SUCCESS,
  DELETE_CHALLENGE_PARTICIPATION_FAILURE,
} from '../reducers/challenge'

function uploadChallengeImageAPI(data) {
  return axios.post('/challenge/image', data)
}
  
function* uploadChallengeImage(action) {
  try {
    const result = yield call(uploadChallengeImageAPI, action.data)
    yield put({
      type: UPLOAD_CHALLENGE_IMAGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: UPLOAD_CHALLENGE_IMAGE_FAILURE,
      error: error.response.data
    })
  }
}

function addChallengeAPI(data) {
  return axios.post('/challenge', data)
}
  
function* addChallenge(action) {
  try {
    const result = yield call(addChallengeAPI, action.data)

    yield put({
      type: ADD_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: ADD_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function loadChallengesAPI() {
  return axios.get('/challenge')
}

function* loadChallenges() {
  try {
    const result = yield call(loadChallengesAPI)
    yield put({
      type: LOAD_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadChallengeAPI(data) {
  return axios.get(`/challenge/${data}`)
}

function* loadChallenge(action) {
  try {
    const result = yield call(loadChallengeAPI, action.data)
    yield put({
      type: LOAD_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function loadNewChallengesAPI() {
  return axios.get('/challenge/new')
}

function* loadNewChallenges() {
  try {
    const result = yield call(loadNewChallengesAPI)
    yield put({
      type: LOAD_NEW_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_NEW_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadRecChallengesAPI() {
  return axios.get('/challenge/recommended')
}

function* loadRecChallenges() {
  try {
    const result = yield call(loadRecChallengesAPI)
    yield put({
      type: LOAD_REC_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_REC_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadWorkoutChallengesAPI() {
  return axios.get('/challenge/workout')
}

function* loadWorkoutChallenges() {
  try {
    const result = yield call(loadWorkoutChallengesAPI)
    yield put({
      type: LOAD_WORKOUT_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_WORKOUT_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadStudyChallengesAPI() {
  return axios.get('/challenge/study')
}

function* loadStudyChallenges() {
  try {
    const result = yield call(loadStudyChallengesAPI)
    yield put({
      type: LOAD_STUDY_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_STUDY_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadLifeChallengesAPI() {
  return axios.get('/challenge/life')
}

function* loadLifeChallenges() {
  try {
    const result = yield call(loadLifeChallengesAPI)
    yield put({
      type: LOAD_LIFE_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_LIFE_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadMealChallengesAPI() {
  return axios.get('/challenge/meal')
}

function* loadMealChallenges() {
  try {
    const result = yield call(loadMealChallengesAPI)
    yield put({
      type: LOAD_MEAL_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_MEAL_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadAbilityChallengesAPI() {
  return axios.get('/challenge/ability')
}

function* loadAbilityChallenges() {
  try {
    const result = yield call(loadAbilityChallengesAPI)
    yield put({
      type: LOAD_ABILITY_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_ABILITY_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadHobbyChallengesAPI() {
  return axios.get('/challenge/hobby')
}

function* loadHobbyChallenges() {
  try {
    const result = yield call(loadHobbyChallengesAPI)
    yield put({
      type: LOAD_HOBBY_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_HOBBY_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadAssetChallengesAPI() {
  return axios.get('/challenge/asset')
}

function* loadAssetChallenges() {
  try {
    const result = yield call(loadAssetChallengesAPI)
    yield put({
      type: LOAD_ASSET_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_ASSET_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

// 내가 참여하고 있는 챌린지 목록 불러오기
function loadMyChallengesAPI() {
  return axios.get('/challengeParticipation')
}

function* loadMyChallenges() {
  try {
    const result = yield call(loadMyChallengesAPI)
    yield put({
      type: LOAD_MY_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_MY_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function loadMyCreateChallengesAPI() {
  return axios.get('/challenge/mychallenge')
}

function* loadMyCreateChallenges() {
  try {
    const result = yield call(loadMyCreateChallengesAPI)
    yield put({
      type: LOAD_MY_CREATE_CHALLENGES_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LOAD_MY_CREATE_CHALLENGES_FAILURE,
      error: error.response.data
    })
  }
}

function participateChallengeAPI(data) {
  return axios.post('/challengeParticipation', data)
}

function* participateChallenge(action) {
  try {
    const result = yield call(participateChallengeAPI, action.data)
    yield put({
      type: PARTICIPATE_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: PARTICIPATE_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function certifyChallengeAPI(data) {
  return axios.post(`/challengeParticipation/${data.challengeId}`, data)
}

function* certifyChallenge(action) {
  try {
    const result = yield call(certifyChallengeAPI, action.data)
    yield put({
      type: CERTIFY_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: CERTIFY_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function likeChallengeAPI(data) {
  return axios.put(`/challenge/${data}/like`)
}

function* likeChallenge(action) {
  try {
    const result = yield call(likeChallengeAPI, action.data)
    yield put({
      type: LIKE_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: LIKE_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function unlikeChallengeAPI(data) {
  return axios.delete(`/challenge/${data}/like`)
}

function* unlikeChallenge(action) {
  try {
    const result = yield call(unlikeChallengeAPI, action.data)
    yield put({
      type: UNLIKE_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: UNLIKE_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function searchChallengeAPI(data) {
  return axios.post(`/challenge/search/${data}`)
}

function* searchChallenge(action) {
  try {
    const result = yield call(searchChallengeAPI, action.data)
    yield put({
      type: SEARCH_CHALLENGE_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: SEARCH_CHALLENGE_FAILURE,
      error: error.response.data
    })
  }
}

function deleteChallengeParticipationAPI(data) {
  return axios.delete(`/challengeParticipation/${data}`)
}

function* deleteChallengeParticipation(action) {
  try {
    const result = yield call(deleteChallengeParticipationAPI, action.data)
    yield put({
      type: DELETE_CHALLENGE_PARTICIPATION_SUCCESS,
      data: result.data
    })
  } catch (error) {
    yield put({
      type: DELETE_CHALLENGE_PARTICIPATION_FAILURE,
      error: error.response.data
    })
  }
}

function* watchUploadChallengeImage() {
  yield takeLatest(UPLOAD_CHALLENGE_IMAGE_REQUEST, uploadChallengeImage)
}

function* watchAddChallenge() {
  yield takeLatest(ADD_CHALLENGE_REQUEST, addChallenge)
}

function* watchLoadChallenges() {
  yield takeLatest(LOAD_CHALLENGES_REQUEST, loadChallenges)
}

function* watchLoadChallenge() {
  yield takeLatest(LOAD_CHALLENGE_REQUEST, loadChallenge)
}

function* watchLoadNewChallenges() {
  yield takeLatest(LOAD_NEW_CHALLENGES_REQUEST, loadNewChallenges)
}

function* watchLoadRecChallenges() {
  yield takeLatest(LOAD_REC_CHALLENGES_REQUEST, loadRecChallenges)
}

function* watchLoadWorkoutChallenges() {
  yield takeLatest(LOAD_WORKOUT_CHALLENGES_REQUEST, loadWorkoutChallenges)
}

function* watchLoadStudyChallenges() {
  yield takeLatest(LOAD_STUDY_CHALLENGES_REQUEST, loadStudyChallenges)
}

function* watchLoadLifeChallenges() {
  yield takeLatest(LOAD_LIFE_CHALLENGES_REQUEST, loadLifeChallenges)
}

function* watchLoadMealChallenges() {
  yield takeLatest(LOAD_MEAL_CHALLENGES_REQUEST, loadMealChallenges)
}

function* watchLoadAbilityChallenges() {
  yield takeLatest(LOAD_ABILITY_CHALLENGES_REQUEST, loadAbilityChallenges)
}

function* watchLoadHobbyChallenges() {
  yield takeLatest(LOAD_HOBBY_CHALLENGES_REQUEST, loadHobbyChallenges)
}

function* watchLoadAssetChallenges() {
  yield takeLatest(LOAD_ASSET_CHALLENGES_REQUEST, loadAssetChallenges)
}

function* watchLoadMyChallenges() {
  yield takeLatest(LOAD_MY_CHALLENGES_REQUEST, loadMyChallenges)
}

function* watchLoadMyCreateChallenges() {
  yield takeLatest(LOAD_MY_CREATE_CHALLENGES_REQUEST, loadMyCreateChallenges)
}

function* watchParticipateChallenge() {
  yield takeLatest(PARTICIPATE_CHALLENGE_REQUEST, participateChallenge)
}

function* watchCertifyChallenge() {
  yield takeLatest(CERTIFY_CHALLENGE_REQUEST, certifyChallenge)
}

function* watchLikeChallenge() {
  yield takeLatest(LIKE_CHALLENGE_REQUEST, likeChallenge)
}

function* watchUnlikeChallenge() {
  yield takeLatest(UNLIKE_CHALLENGE_REQUEST, unlikeChallenge)
}

function* watchSearchChallenge() {
  yield takeLatest(SEARCH_CHALLENGE_REQUEST, searchChallenge)
}

function* watchDeleteChallengeParticipation() {
  yield takeLatest(DELETE_CHALLENGE_PARTICIPATION_REQUEST, deleteChallengeParticipation)
}

export default function* challengeSaga() {
  yield all([
    fork(watchUploadChallengeImage),
    fork(watchAddChallenge),
    fork(watchLoadChallenges),
    fork(watchLoadChallenge),
    fork(watchLoadNewChallenges),
    fork(watchLoadRecChallenges),
    fork(watchLoadWorkoutChallenges),
    fork(watchLoadStudyChallenges),
    fork(watchLoadLifeChallenges),
    fork(watchLoadMealChallenges),
    fork(watchLoadAbilityChallenges),
    fork(watchLoadHobbyChallenges),
    fork(watchLoadAssetChallenges),
    fork(watchLoadMyChallenges),
    fork(watchLoadMyCreateChallenges),
    fork(watchParticipateChallenge),
    fork(watchCertifyChallenge),
    fork(watchLikeChallenge),
    fork(watchUnlikeChallenge),
    fork(watchSearchChallenge),
    fork(watchDeleteChallengeParticipation),
  ])
}