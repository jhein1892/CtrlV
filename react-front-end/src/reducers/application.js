export const SET_USER = "SET_USER"; 
export const SET_UPDATED_USER = "SET_UPDATED_USER";
export const SET_USER_HARD_SKILLS = "SET_USER_HARD_SKILLS"; 
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_UPDATED_WORK = "SET_UPDATED_WORK";

export function reducer(state, action) {
  const { hardskills, userHardSkills, user, userInfo, userWorkExperience, updateWork } = action;
  switch(action.type) {
    case SET_APPLICATION_DATA: { 
      return { ...state, hardskills, userHardSkills, user, userWorkExperience };
    }
    case SET_UPDATED_USER: {
      const user = {
        ...state.user,
        ...userInfo
      }
      return {...state, user }
    }
    case SET_UPDATED_WORK: {
      return {...state, updateWork}
    }
    default: throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }

}