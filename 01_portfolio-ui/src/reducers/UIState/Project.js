const defaultProject = {};
const project = (state = defaultProject, action) => {
  switch (action.type) {
    case "PROJECT_DETAILS":
    case "PROJECT_DETAILS_SUCCESS":
      return action.project;
    default:
      return state;
  }
};

export default project;