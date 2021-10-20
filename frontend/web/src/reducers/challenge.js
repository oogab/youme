import produce from 'immer'
import { PURGE } from 'redux-persist/es/constants'

const initialState = {
  challenges: [],         // 전체 챌린지 목록
  singleChallenge: null,  // 챌린지 하나
  newChallenges: [],      // 신규 챌린지 목록
  recChallenges: [],      // 추천 챌린지 목록
  workoutChallenges: [],
  studyChallenges: [],
  lifeChallenges: [],
  mealChallenges: [],
  abilityChallenges: [],
  hobbyChallenges: [],
  assetChallenges: [],
  myChallenges: [],       // 내가 참여하는 챌린지 목록
  myChallenge: null,      // 내가 참여하는 챌린지 하나
  myCreateChallenges: [], // 내가 생성한 챌린지 목록
  searchChallenges: [],
  challengeImagePath: '', // 챌린지 대표 이미지 경로
  /*********************************************************** */
  uploadChallengeImageLoading: false, // 챌린지 대표 이미지 업로드 중
  uploadChallengeImageDone: false,
  uploadChallengeImageError: null,
  /*********************************************************** */
  addChallengeLoading: false, // 챌린지 생성 중
  addChallengeDone: false,
  addChallengeError: null,
  /*********************************************************** */
  loadChallengesLoading: false,
  loadChallengesDone: false,
  loadChallengesError: null,
  /*********************************************************** */
  // loadChallengeLoading: false,
  // loadChallengeDone: false,
  // loadChallengeError: null,
  /*********************************************************** */
  loadNewChallengesLoading: false,
  loadNewChallengesDone: false,
  loadNewChallengesError: null,
  /*********************************************************** */
  loadRecChallengesLoading: false,
  loadRecChallengesDone: false,
  loadRecChallengesError: null,
  /*********************************************************** */
  // 운동
  loadWorkoutChallengesLoading: false,
  loadWorkoutChallengesDone: false,
  loadWorkoutChallengesError: null,
  /*********************************************************** */
  // 공부
  loadStudyChallengesLoading: false,
  loadStudyChallengesDone: false,
  loadStudyChallengesError: null,
  /*********************************************************** */
  // 생활
  loadLifeChallengesLoading: false,
  loadLifeChallengesDone: false,
  loadLifeChallengesError: null,
  /*********************************************************** */
  // 식사
  loadMealChallengesLoading: false,
  loadMealChallengesDone: false,
  loadMealChallengesError: null,
  /*********************************************************** */
  // 역량
  loadAbilityChallengesLoading: false,
  loadAbilityChallengesDone: false,
  loadAbilityChallengesError: null,
  /*********************************************************** */
  // 취미
  loadHobbyChallengesLoading: false,
  loadHobbyChallengesDone: false,
  loadHobbyChallengesError: null,
  /*********************************************************** */
  // 자산
  loadAssetChallengesLoading: false,
  loadAssetChallengesDone: false,
  loadAssetChallengesError: null,
  /*********************************************************** */
  loadMyChallengesLoading: false,
  loadMyChallengesDone: false,
  loadMyChallengesError: null,
  /*********************************************************** */
  loadMyCreateChallengesLoading: false,
  loadMyCreateChallengesDone: false,
  loadMyCreateChallengesError: null,
  /*********************************************************** */
  participateChallengeLoading: false,
  participateChallengeDone: false,
  participateChallengeError: null,
  /*********************************************************** */
  certifyChallengeLoading: false,
  certifyChallengeDone: false,
  certifyChallengeError: null,
  /*********************************************************** */
  likeChallengeLoading: false,
  likeChallengeDone: false,
  likeChallengeError: null,
  /*********************************************************** */
  unlikeChallengeLoading: false,
  unlikeChallengeDone: false,
  unlikeChallengeError: null,
  /*********************************************************** */
  searchChallengeLoading: false,
  searchChallengeDone: false,
  searchChallengeError: null,
  /*********************************************************** */
  deleteChallengeParticipationLoading: false,
  deleteChallengeParticipationDone: false,
  deleteChallengeParticipationError: null,
}

export const UPLOAD_CHALLENGE_IMAGE_REQUEST = 'UPLOAD_CHALLENGE_IMAGE_REQUEST'
export const UPLOAD_CHALLENGE_IMAGE_SUCCESS = 'UPLOAD_CHALLENGE_IMAGE_SUCCESS'
export const UPLOAD_CHALLENGE_IMAGE_FAILURE = 'UPLOAD_CHALLENGE_IMAGE_FAILURE'

export const ADD_CHALLENGE_REQUEST = 'ADD_CHALLENGE_REQUEST'
export const ADD_CHALLENGE_SUCCESS = 'ADD_CHALLENGE_SUCCESS'
export const ADD_CHALLENGE_FAILURE = 'ADD_CHALLENGE_FAILURE'

// 전체 챌린지 그냥 쌓인 순서대로 불러오기
export const LOAD_CHALLENGES_REQUEST = 'LOAD_CHALLENGES_REQUEST'
export const LOAD_CHALLENGES_SUCCESS = 'LOAD_CHALLENGES_SUCCESS'
export const LOAD_CHALLENGES_FAILURE = 'LOAD_CHALLENGES_FAILURE'

// 챌린지 상세 페이지를 위한 하나의 챌린지 불러오기
export const LOAD_CHALLENGE_REQUEST = 'LOAD_CHALLENGE_REQUEST'
export const LOAD_CHALLENGE_SUCCESS = 'LOAD_CHALLENGE_SUCCESS'
export const LOAD_CHALLENGE_FAILURE = 'LOAD_CHALLENGE_FAILURE'

// 신규 챌린지 불러오기
export const LOAD_NEW_CHALLENGES_REQUEST = 'LOAD_NEW_CHALLENGES_REQUEST'
export const LOAD_NEW_CHALLENGES_SUCCESS = 'LOAD_NEW_CHALLENGES_SUCCESS'
export const LOAD_NEW_CHALLENGES_FAILURE = 'LOAD_NEW_CHALLENGES_FAILURE'

// 추천 챌린지 불러오기
export const LOAD_REC_CHALLENGES_REQUEST = 'LOAD_REC_CHALLENGES_REQUEST'
export const LOAD_REC_CHALLENGES_SUCCESS = 'LOAD_REC_CHALLENGES_SUCCESS'
export const LOAD_REC_CHALLENGES_FAILURE = 'LOAD_REC_CHALLENGES_FAILURE'

// 운동 챌린지 불러오기
export const LOAD_WORKOUT_CHALLENGES_REQUEST = 'LOAD_WORKOUT_CHALLENGES_REQUEST'
export const LOAD_WORKOUT_CHALLENGES_SUCCESS = 'LOAD_WORKOUT_CHALLENGES_SUCCESS'
export const LOAD_WORKOUT_CHALLENGES_FAILURE = 'LOAD_WORKOUT_CHALLENGES_FAILURE'

// 공부 챌린지 불러오기
export const LOAD_STUDY_CHALLENGES_REQUEST = 'LOAD_STUDY_CHALLENGES_REQUEST'
export const LOAD_STUDY_CHALLENGES_SUCCESS = 'LOAD_STUDY_CHALLENGES_SUCCESS'
export const LOAD_STUDY_CHALLENGES_FAILURE = 'LOAD_STUDY_CHALLENGES_FAILURE'

// 생활 챌린지 불러오기
export const LOAD_LIFE_CHALLENGES_REQUEST = 'LOAD_LIFE_CHALLENGES_REQUEST'
export const LOAD_LIFE_CHALLENGES_SUCCESS = 'LOAD_LIFE_CHALLENGES_SUCCESS'
export const LOAD_LIFE_CHALLENGES_FAILURE = 'LOAD_LIFE_CHALLENGES_FAILURE'

// 식사 챌린지 불러오기
export const LOAD_MEAL_CHALLENGES_REQUEST = 'LOAD_MEAL_CHALLENGES_REQUEST'
export const LOAD_MEAL_CHALLENGES_SUCCESS = 'LOAD_MEAL_CHALLENGES_SUCCESS'
export const LOAD_MEAL_CHALLENGES_FAILURE = 'LOAD_MEAL_CHALLENGES_FAILURE'

// 역량 챌린지 불러오기
export const LOAD_ABILITY_CHALLENGES_REQUEST = 'LOAD_ABILITY_CHALLENGES_REQUEST'
export const LOAD_ABILITY_CHALLENGES_SUCCESS = 'LOAD_ABILITY_CHALLENGES_SUCCESS'
export const LOAD_ABILITY_CHALLENGES_FAILURE = 'LOAD_ABILITY_CHALLENGES_FAILURE'

// 취미 챌린지 불러오기
export const LOAD_HOBBY_CHALLENGES_REQUEST = 'LOAD_HOBBY_CHALLENGES_REQUEST'
export const LOAD_HOBBY_CHALLENGES_SUCCESS = 'LOAD_HOBBY_CHALLENGES_SUCCESS'
export const LOAD_HOBBY_CHALLENGES_FAILURE = 'LOAD_HOBBY_CHALLENGES_FAILURE'

// 자산 챌린지 불러오기
export const LOAD_ASSET_CHALLENGES_REQUEST = 'LOAD_ASSET_CHALLENGES_REQUEST'
export const LOAD_ASSET_CHALLENGES_SUCCESS = 'LOAD_ASSET_CHALLENGES_SUCCESS'
export const LOAD_ASSET_CHALLENGES_FAILURE = 'LOAD_ASSET_CHALLENGES_FAILURE'

// 내가 참여하고 있는 챌린지 불러오기
export const LOAD_MY_CHALLENGES_REQUEST = 'LOAD_MY_CHALLENGES_REQUEST'
export const LOAD_MY_CHALLENGES_SUCCESS = 'LOAD_MY_CHALLENGES_SUCCESS'
export const LOAD_MY_CHALLENGES_FAILURE = 'LOAD_MY_CHALLENGES_FAILURE'

// 내가 생성한 챌린지 불러오기
export const LOAD_MY_CREATE_CHALLENGES_REQUEST = 'LOAD_MY_CREATE_CHALLENGES_REQUEST'
export const LOAD_MY_CREATE_CHALLENGES_SUCCESS = 'LOAD_MY_CREATE_CHALLENGES_SUCCESS'
export const LOAD_MY_CREATE_CHALLENGES_FAILURE = 'LOAD_MY_CREATE_CHALLENGES_FAILURE'

// 챌린지 참여하기
export const PARTICIPATE_CHALLENGE_REQUEST = 'PARTICIPATE_CHALLENGE_REQUEST'
export const PARTICIPATE_CHALLENGE_SUCCESS = 'PARTICIPATE_CHALLENGE_SUCCESS'
export const PARTICIPATE_CHALLENGE_FAILURE = 'PARTICIPATE_CHALLENGE_FAILURE'
export const CLEAR_PARTICIPATE_CHALLENGE = 'CLEAR_PARTICIPATE_CHALLENGE'

// 챌린지 인증하기
export const CERTIFY_CHALLENGE_REQUEST = 'CERTIFY_CHALLENGE_REQUEST'
export const CERTIFY_CHALLENGE_SUCCESS = 'CERTIFY_CHALLENGE_SUCCESS'
export const CERTIFY_CHALLENGE_FAILURE = 'CERTIFY_CHALLENGE_FAILURE'
export const CLEAR_CERTIFY_CHALLENGE = 'CLEAR_CERTIFY_CHALLENGE'

// 챌린지 좋아요
export const LIKE_CHALLENGE_REQUEST = 'LIKE_CHALLENGE_REQUEST'
export const LIKE_CHALLENGE_SUCCESS = 'LIKE_CHALLENGE_SUCCESS'
export const LIKE_CHALLENGE_FAILURE = 'LIKE_CHALLENGE_FAILURE'

// 챌린지 안좋아요
export const UNLIKE_CHALLENGE_REQUEST = 'UNLIKE_CHALLENGE_REQUEST'
export const UNLIKE_CHALLENGE_SUCCESS = 'UNLIKE_CHALLENGE_SUCCESS'
export const UNLIKE_CHALLENGE_FAILURE = 'UNLIKE_CHALLENGE_FAILURE'

// 챌린지 검색하기
export const SEARCH_CHALLENGE_REQUEST = 'SEARCH_CHALLENGE_REQUEST'
export const SEARCH_CHALLENGE_SUCCESS = 'SEARCH_CHALLENGE_SUCCESS'
export const SEARCH_CHALLENGE_FAILURE = 'SEARCH_CHALLENGE_FAILURE'

// 참여중인 챌린지 탈퇴하기
export const DELETE_CHALLENGE_PARTICIPATION_REQUEST = 'DELETE_CHALLENGE_PARTICIPATION_REQUEST'
export const DELETE_CHALLENGE_PARTICIPATION_SUCCESS = 'DELETE_CHALLENGE_PARTICIPATION_SUCCESS'
export const DELETE_CHALLENGE_PARTICIPATION_FAILURE = 'DELETE_CHALLENGE_PARTICIPATION_FAILURE'
export const CLEAR_DELETE_CHALLENGE_PARTICIPATION = 'CLEAR_DELETE_CHALLENGE_PARTICIPATION'

// 참여중인 챌린지의 상세정보 보여주기
export const SHOW_MY_CHALLENGE = 'SHOW_MY_CHALLENGE'
export const CLEAR_SHOW_MY_CHALLENGE = 'CLEAR_SHOW_MY_CHALLENGE'

// 챌린지 하나의 정보 보여주기
export const SHOW_CHALLENGE = 'SHOW_CHALLENGE'
export const CLEAR_SHOW_CHALLENGE = 'CLEAR_SHOW_CHALLENGE'

export const CLEAR_CHALLENGES = 'CLEAR_CHALLENGES'
export const CLEAR_CHALLENGE = 'CLEAR_CHALLENGE'
export const CLEAR_MY_CHALLENGES = 'CLEAR_MY_CHALLENGES'
export const CLEAR_ADD_CHALLENGE_DONE = 'CLEAR_ADD_CHALLENGE_DONE'
export const CLEAR_LOAD_CHALLENGE_DONE = 'CLEAR_LOAD_CHALLENGE_DONE'
export const CLEAR_IMAGE_PATH = 'CLEAR_IMAGE_PATH'

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case PURGE:
      return { ...initialState }
    case CLEAR_CHALLENGES:
      draft.challenges = []
      break
    case CLEAR_CHALLENGE:
      draft.singleChallenge = null
      break
    case CLEAR_MY_CHALLENGES:
      draft.myChallenges = []
      break
    case CLEAR_ADD_CHALLENGE_DONE:
      draft.addChallengeDone = false
      break
    case CLEAR_LOAD_CHALLENGE_DONE:
      draft.loadChallengeDone = false
      break
    case CLEAR_IMAGE_PATH:
      draft.challengeImagePath = ''
      break
    /*********************************************************** */
    case UPLOAD_CHALLENGE_IMAGE_REQUEST:
      draft.uploadChallengeImageLoading = true
      draft.uploadChallengeImageDone = false
      draft.uploadChallengeImageError = null
      break
    case UPLOAD_CHALLENGE_IMAGE_SUCCESS:
      draft.uploadChallengeImageLoading = false
      draft.uploadChallengeImagaDone = true
      draft.challengeImagePath = action.data
      break
    case UPLOAD_CHALLENGE_IMAGE_FAILURE:
      draft.uploadChallengeImageLoading = false
      draft.uploadChallengeImageError = action.error
      break
    /*********************************************************** */
    case ADD_CHALLENGE_REQUEST:
      draft.addChallengeLoading = true
      draft.addChallengeDone = false
      draft.addChallengeError = null
      break
    case ADD_CHALLENGE_SUCCESS:
      draft.addChallengeLoading = false
      draft.addChallengeDone = true
      draft.challengeImagePath = ''
      break
    case ADD_CHALLENGE_FAILURE:
      draft.addChallengeLoading = false
      draft.addChallengeError = action.error
      break
    /*********************************************************** */
    case LOAD_CHALLENGES_REQUEST:
      draft.loadChallengesLoading = true
      draft.loadChallengesDone = false
      draft.loadChallengesError = null
      break
    case LOAD_CHALLENGES_SUCCESS:
      draft.loadChallengesLoading = false
      draft.loadChallengesDone = true
      draft.challenges = []
      draft.challenges = draft.challenges.concat(action.data)
      break
    case LOAD_CHALLENGES_FAILURE:
      draft.loadChallengesLoading = false
      draft.loadChallengesError = action.error
      break
    /*********************************************************** */
    // case LOAD_CHALLENGE_REQUEST:
    //   draft.loadChallengeLoading = true
    //   draft.loadChallengeDone = false
    //   draft.loadChallengeError = null
    //   break
    // case LOAD_CHALLENGE_SUCCESS:
    //   draft.loadChallengeLoading = false
    //   draft.loadChallengeDone = true
    //   draft.singleChallenge = null
    //   draft.singleChallenge = action.data
    //   break
    // case LOAD_CHALLENGE_FAILURE:
    //   draft.loadChallengeLoading = false
    //   draft.loadChallengeError = action.error
    //   break
    /*********************************************************** */
    case LOAD_NEW_CHALLENGES_REQUEST:
      draft.loadNewChallengesLoading = true
      draft.loadNewChallengesDone = false
      draft.loadNewChallengesError = null
      break
    case LOAD_NEW_CHALLENGES_SUCCESS:
      draft.loadNewChallengesLoading = false
      draft.loadNewChallengesDone = true
      draft.newChallenges = []
      draft.newChallenges = draft.newChallenges.concat(action.data)
      break
    case LOAD_NEW_CHALLENGES_FAILURE:
      draft.loadNewChallengesLoading = false
      draft.loadNewChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_REC_CHALLENGES_REQUEST:
      draft.loadRecChallengesLoading = true
      draft.loadRecChallengesDone = false
      draft.loadRecChallengesError = null
      break
    case LOAD_REC_CHALLENGES_SUCCESS:
      draft.loadRecChallengesLoading = false
      draft.loadRecChallengesDone = true
      draft.recChallenges = []
      draft.recChallenges = draft.recChallenges.concat(action.data)
      break
    case LOAD_REC_CHALLENGES_FAILURE:
      draft.loadRecChallengesLoading = false
      draft.loadRecChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_WORKOUT_CHALLENGES_REQUEST:
      draft.loadWorkoutChallengesLoading = true
      draft.loadWorkoutChallengesDone = false
      draft.loadWorkoutChallengesError = null
      break
    case LOAD_WORKOUT_CHALLENGES_SUCCESS:
      draft.loadWorkoutChallengesLoading = false
      draft.loadWorkoutChallengesDone = true
      draft.workoutChallenges = []
      draft.workoutChallenges = draft.workoutChallenges.concat(action.data)
      break
    case LOAD_WORKOUT_CHALLENGES_FAILURE:
      draft.loadWorkoutChallengesLoading = false
      draft.loadWorkoutChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_STUDY_CHALLENGES_REQUEST:
      draft.loadStudyChallengesLoading = true
      draft.loadStudyChallengesDone = false
      draft.loadStudyChallengesError = null
      break
    case LOAD_STUDY_CHALLENGES_SUCCESS:
      draft.loadStudyChallengesLoading = false
      draft.loadStudyChallengesDone = true
      draft.studyChallenges = []
      draft.studyChallenges = draft.studyChallenges.concat(action.data)
      break
    case LOAD_STUDY_CHALLENGES_FAILURE:
      draft.loadStudyChallengesLoading = false
      draft.loadStudyChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_LIFE_CHALLENGES_REQUEST:
      draft.loadLifeChallengesLoading = true
      draft.loadLifeChallengesDone = false
      draft.loadLifeChallengesError = null
      break
    case LOAD_LIFE_CHALLENGES_SUCCESS:
      draft.loadLifeChallengesLoading = false
      draft.loadLifeChallengesDone = true
      draft.lifeChallenges = []
      draft.lifeChallenges = draft.lifeChallenges.concat(action.data)
      break
    case LOAD_LIFE_CHALLENGES_FAILURE:
      draft.loadLifeChallengesLoading = false
      draft.loadLifeChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_MEAL_CHALLENGES_REQUEST:
      draft.loadMealChallengesLoading = true
      draft.loadMealChallengesDone = false
      draft.loadMealChallengesError = null
      break
    case LOAD_MEAL_CHALLENGES_SUCCESS:
      draft.loadMealChallengesLoading = false
      draft.loadMealChallengesDone = true
      draft.mealChallenges = []
      draft.mealChallenges = draft.mealChallenges.concat(action.data)
      break
    case LOAD_MEAL_CHALLENGES_FAILURE:
      draft.loadMealChallengesLoading = false
      draft.loadMealChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_ABILITY_CHALLENGES_REQUEST:
      draft.loadAbilityChallengesLoading = true
      draft.loadAbilityChallengesDone = false
      draft.loadAbilityChallengesError = null
      break
    case LOAD_ABILITY_CHALLENGES_SUCCESS:
      draft.loadAbilityChallengesLoading = false
      draft.loadAbilityChallengesDone = true
      draft.abilityChallenges = []
      draft.abilityChallenges = draft.abilityChallenges.concat(action.data)
      break
    case LOAD_ABILITY_CHALLENGES_FAILURE:
      draft.loadAbilityChallengesLoading = false
      draft.loadAbilityChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_HOBBY_CHALLENGES_REQUEST:
      draft.loadHobbyChallengesLoading = true
      draft.loadHobbyChallengesDone = false
      draft.loadHobbyChallengesError = null
      break
    case LOAD_HOBBY_CHALLENGES_SUCCESS:
      draft.loadHobbyChallengesLoading = false
      draft.loadHobbyChallengesDone = true
      draft.hobbyChallenges = []
      draft.hobbyChallenges = draft.hobbyChallenges.concat(action.data)
      break
    case LOAD_HOBBY_CHALLENGES_FAILURE:
      draft.loadHobbyChallengesLoading = false
      draft.loadHobbyChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_ASSET_CHALLENGES_REQUEST:
      draft.loadAssetChallengesLoading = true
      draft.loadAssetChallengesDone = false
      draft.loadAssetChallengesError = null
      break
    case LOAD_ASSET_CHALLENGES_SUCCESS:
      draft.loadAssetChallengesLoading = false
      draft.loadAssetChallengesDone = true
      draft.assetChallenges = []
      draft.assetChallenges = draft.assetChallenges.concat(action.data)
      break
    case LOAD_ASSET_CHALLENGES_FAILURE:
      draft.loadAssetChallengesLoading = false
      draft.loadAssetChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_MY_CHALLENGES_REQUEST:
      draft.loadMyChallengesLoading = true
      draft.loadMyChallengesDone = false
      draft.loadMyChallengesError = null
      break
    case LOAD_MY_CHALLENGES_SUCCESS:
      draft.loadMyChallengesLoading = false
      draft.loadMyChallengesDone = true
      draft.myChallenges = []
      draft.myChallenges = draft.myChallenges.concat(action.data)
      break
    case LOAD_MY_CHALLENGES_FAILURE:
      draft.loadMyChallengesLoading = false
      draft.loadMyChallengesError = action.error
      break
    /*********************************************************** */
    case LOAD_MY_CREATE_CHALLENGES_REQUEST:
      draft.loadMyCreateChallengesLoading = true
      draft.loadMyCreateChallengesDone = false
      draft.loadMyCreateChallengesError = null
      break
    case LOAD_MY_CREATE_CHALLENGES_SUCCESS:
      draft.loadMyCreateChallengesLoading = false
      draft.loadMyCreateChallengesDone = true
      draft.myCreateChallenges = []
      draft.myCreateChallenges = draft.myCreateChallenges.concat(action.data)
      break
    case LOAD_MY_CREATE_CHALLENGES_FAILURE:
      draft.loadMyCreateChallengesLoading = false
      draft.loadMyCreateChallengesError = action.error
      break
    /*********************************************************** */
    case PARTICIPATE_CHALLENGE_REQUEST:
      draft.participateChallengeLoading = true
      draft.participateChallengeDone = false
      draft.participateChallengeError = null
      break
    case PARTICIPATE_CHALLENGE_SUCCESS:
      draft.participateChallengeLoading = false
      draft.participateChallengeDone = true
      draft.myChallenges = draft.myChallenges.concat(action.data)
      break
    case PARTICIPATE_CHALLENGE_FAILURE:
      draft.participateChallengeLoading = false
      draft.participateChallengeError = action.error
      break
    case CLEAR_PARTICIPATE_CHALLENGE:
      draft.participateChallengeLoading = false
      draft.participateChallengeDone = false
      draft.participateChallengeError = null
      break
    /*********************************************************** */
    case CERTIFY_CHALLENGE_REQUEST:
      draft.certifyChallengeLoading = true
      draft.certifyChallengeDone = false
      draft.certifyChallengeError = null
      break
    case CERTIFY_CHALLENGE_SUCCESS: {
      draft.certifyChallengeLoading = false
      draft.certifyChallengeDone = true
      draft.challengeImagePath = ''
      const challenge = draft.myChallenges.find((v) => v.id === action.data.ChallengeParticipationId)
      challenge.certification_count += 1
      challenge.DailyCertifyChallenges = challenge.DailyCertifyChallenges.concat(action.data)
      break
    }
    case CERTIFY_CHALLENGE_FAILURE:
      draft.certifyChallengeLoading = false
      draft.certifyChallengeError = action.error
      break
    case CLEAR_CERTIFY_CHALLENGE:
      draft.certifyChallengeLoading = false
      draft.certifyChallengeDone = false
      draft.certifyChallengeError = null
      break
    /*********************************************************** */
    case LIKE_CHALLENGE_REQUEST:
      draft.likeChallengeLoading = true
      draft.likeChallengeDone = false
      draft.likeChallengeError = null
      break
    case LIKE_CHALLENGE_SUCCESS: {
      const challenge = draft.challenges.find((v) => v.id === action.data.ChallengeId)
      if (challenge) {
        challenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('1', challenge)
      const oneChallenge = draft.singleChallenge
      if (oneChallenge) {
        oneChallenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('2', oneChallenge)
      const newChallenge = draft.newChallenges.find((v) => v.id === action.data.ChallengeId)
      if (newChallenge) {
        newChallenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('3', newChallenge)
      const recChallenge = draft.recChallenges.find((v) => v.id === action.data.ChallengeId)
      if (recChallenge) {
        recChallenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('4', recChallenge)
      const myChallenge = draft.myChallenges.map((v) => v.Challenge).find((v) => v.id === action.data.ChallengeId)
      // console.log('4-1', myChallenge)
      if (myChallenge) {
        myChallenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('5', myChallenge)
      const myCreateChallenge = draft.myCreateChallenges.find((v) => v.id === action.data.ChallengeId)
      if (myCreateChallenge) {
        myCreateChallenge.Likers.push({ id: action.data.UserId })
      }
      // console.log('6', myCreateChallenge)
      draft.likeChallengeLoading = false
      draft.likeChallengeDone = true
      break
    }
    case LIKE_CHALLENGE_FAILURE:
      draft.likeChallengeLoading = false
      draft.likeChallengeError = action.error
      break
    /*********************************************************** */
    case UNLIKE_CHALLENGE_REQUEST:
      draft.unlikeChallengeLoading = true
      draft.unlikeChallengeDone = false
      draft.unlikeChallengeError = null
      break
    case UNLIKE_CHALLENGE_SUCCESS: {
      const challenge = draft.challenges.find((v) => v.id === action.data.ChallengeId)
      if (challenge) {
        challenge.Likers = challenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('1', challenge)
      const oneChallenge = draft.singleChallenge
      if (oneChallenge) {
        oneChallenge.Likers = oneChallenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('2', oneChallenge)
      const newChallenge = draft.newChallenges.find((v) => v.id === action.data.ChallengeId)
      if (newChallenge) {
        newChallenge.Likers = newChallenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('3', newChallenge)
      const recChallenge = draft.recChallenges.find((v) => v.id === action.data.ChallengeId)
      if (recChallenge) {
        recChallenge.Likers = recChallenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('4', recChallenge)
      const myChallenge = draft.myChallenges.map((v) => v.Challenge).find((v) => v.id === action.data.ChallengeId)
      // console.log('4-1', myChallenge)
      if (myChallenge) {
        myChallenge.Likers = myChallenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('5', myChallenge)
      const myCreateChallenge = draft.myCreateChallenges.find((v) => v.id === action.data.ChallengeId)
      if (myCreateChallenge) {
        myCreateChallenge.Likers = myCreateChallenge.Likers.filter((v) => v.id !== action.data.UserId)
      }
      // console.log('6', myCreateChallenge)
      draft.unlikeChallengeLoading = false
      draft.unlikeChallengeDone = true
      break
    }
    case UNLIKE_CHALLENGE_FAILURE:
      draft.unlikeChallengeLoading = false
      draft.unlikeChallengeError = action.error
      break
    /*********************************************************** */
    case SEARCH_CHALLENGE_REQUEST:
      draft.searchChallengeLoading = true
      draft.searchChallengeDone = false
      draft.searchChallengeError = null
      break
    case SEARCH_CHALLENGE_SUCCESS:
      draft.searchChallengeLoading = false
      draft.searchChallengeDone = true
      draft.searchChallenges = []
      draft.searchChallenges = draft.searchChallenges.concat(action.data)
      break
    case SEARCH_CHALLENGE_FAILURE:
      draft.searchChallengeLoading = false
      draft.searchChallengeError = action.error
      break
    /*********************************************************** */
    case SHOW_MY_CHALLENGE:
      const tempChallenge = draft.myChallenges.find((v) => v.id === action.data)
      draft.myChallenge = tempChallenge
      break
    case CLEAR_SHOW_MY_CHALLENGE:
      draft.myChallenge = null
      break
    /*********************************************************** */
    case SHOW_CHALLENGE: {
      const tempChallenge = draft.challenges.find((v) => v.id === action.data)
      draft.singleChallenge = tempChallenge
      break
    }
    case CLEAR_SHOW_CHALLENGE:
      draft.singleChallenge = null
      break
    /*********************************************************** */
    case DELETE_CHALLENGE_PARTICIPATION_REQUEST:
      draft.deleteChallengeParticipationLoading = true
      draft.deleteChallengeParticipationDone = false
      draft.deleteChallengeParticipationError = null
      break
    case DELETE_CHALLENGE_PARTICIPATION_SUCCESS:
      draft.deleteChallengeParticipationLoading = false
      draft.deleteChallengeParticipationDone = true
      draft.myChallenges = draft.myChallenges.filter((v) => v.id !== action.data)
      break
    case DELETE_CHALLENGE_PARTICIPATION_FAILURE:
      draft.deleteChallengeParticipationLoading = false
      draft.deleteChallengeParticipationError = action.error
      break
    case CLEAR_DELETE_CHALLENGE_PARTICIPATION:
      draft.deleteChallengeParticipationLoading = false
      draft.deleteChallengeParticipationDone = false
      draft.deleteChallengeParticipationError = null
      break
    default:
      break
  }
})

export default reducer