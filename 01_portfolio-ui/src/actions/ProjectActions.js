import { Api } from "../lib/api/api";

export const getProjects = () => async dispatch => {
  const api = new Api();
  dispatch({
    type: "PROJECTS"
  });
  try {
    const projects = await api.projects.getProjects();
    dispatch({
      type: "PROJECTS_SUCCESS",
      projects
    });
  } catch (error) {
    dispatch({
      type: "COMPANIES_ERROR",
      error
    });
  }
};

export const getProject = (projectId) => async dispatch => {
  const api = new Api();
  dispatch({
    type: "PROJECT"
  });
  try {
    const project = await api.projects.getProject(projectId);
    dispatch({
      type: "PROJECT_SUCCESS",
      project
    });
  } catch (error) {
    dispatch({
      type: "PROJECT_ERROR",
      error
    });
  }
};
