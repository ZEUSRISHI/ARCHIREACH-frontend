import { createContext, useContext, useState, useEffect } from "react";

const EditContext = createContext();

export function EditProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state from local storage or default values
  const [savedArchitects, setSavedArchitects] = useState(() => {
    const saved = localStorage.getItem("savedArchitects");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedProjects, setSavedProjects] = useState(() => {
    const saved = localStorage.getItem("savedProjects");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("savedArchitects", JSON.stringify(savedArchitects));
  }, [savedArchitects]);

  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
  }, [savedProjects]);

  const addArchitect = (newArch) => {
    setSavedArchitects([...savedArchitects, { id: Date.now(), ...newArch }]);
  };

  const updateArchitect = (id, updatedArch) => {
    setSavedArchitects(savedArchitects.map(a => a.id === id ? { ...a, ...updatedArch } : a));
  };

  const deleteArchitect = (id) => {
    setSavedArchitects(savedArchitects.filter(a => a.id !== id));
  };

  const addProject = (newProj) => {
    setSavedProjects([...savedProjects, { id: Date.now(), ...newProj }]);
  };

  const updateProject = (id, updatedProj) => {
    setSavedProjects(savedProjects.map(p => p.id === id ? { ...p, ...updatedProj } : p));
  };

  const deleteProject = (id) => {
    setSavedProjects(savedProjects.filter(p => p.id !== id));
  };

  return (
    <EditContext.Provider value={{
      isEditing,
      setIsEditing,
      savedArchitects,
      addArchitect,
      updateArchitect,
      deleteArchitect,
      savedProjects,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEditContext() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error("useEditContext must be used within EditProvider");
  }
  return context;
}