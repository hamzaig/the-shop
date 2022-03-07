import * as constants from "../constants/productConstant";

export function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case constants.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case constants.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case constants.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export function productDetailsReducer(state = { product: { reviews: [] } }, action) {
  switch (action.type) {
    case constants.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case constants.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case constants.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export function productDeleteReducer(state = {}, action) {
  switch (action.type) {
    case constants.PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case constants.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case constants.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export function productCreateReducer(state = {}, action) {
  switch (action.type) {
    case constants.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case constants.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case constants.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case constants.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state;
  }
}

export function productUpdateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case constants.PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case constants.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case constants.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case constants.PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state;
  }
}

export function productCreateReviewReducer(state = {}, action) {
  switch (action.type) {
    case constants.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case constants.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case constants.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case constants.PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state;
  }
}






/////////////////////////////
// function visibilityFilter(state = 'SHOW_ALL', action) {
//   if (action.type === 'SET_VISIBILITY_FILTER') {
//     return action.filter
//   } else {
//     return state
//   }
// }

// function todos(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return state.concat([{ text: action.text, completed: false }])
//     case 'TOGGLE_TODO':
//       return state.map((todo, index) =>
//         action.index === index
//           ? { text: todo.text, completed: !todo.completed }
//           : todo
//       )
//     default:
//       return state
//   }
// }

// function todoApp(state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }


