const defaultProjects = [];
const projects = (state = defaultProjects, action) => {
  switch (action.type) {
    case "PROJECTS_SUCCESS":
      return [...action.projects];
    default:
      return state;
  }
};

export default projects;
