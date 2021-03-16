export const SET_USER = "SET_USER"; 
export const SET_USER_HARD_SKILLS = "SET_USER_HARD_SKILLS"; 
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";


export function reducer(state, action) {
<<<<<<< HEAD
  const { hardskills, userHardSkills, user, userWorkExperience } = action;
=======
  const { hardskills, userHardSkills, user} = action;
>>>>>>> feature/update-raw-hard-skills
  switch(action.type) {
    case SET_APPLICATION_DATA: { 
      return { ...state, hardskills, userHardSkills, user, userWorkExperience };
    }
    default: throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }

}