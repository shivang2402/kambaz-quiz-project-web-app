
import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useState,useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client"; 
import * as modulesClient from "./client"; 



export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const removeModule = async (moduleId: string) => { 
    await modulesClient.deleteModule(moduleId); 
    dispatch(deleteModule(moduleId)); 
  }; 
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = {
      name: moduleName,
      description: "",
      lessons: [],
    };
  
    try {
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
      setModuleName("");
    } catch (error) {
      console.error("Failed to create module:", error);
    }
  };
  
  const fetchModules = async () => { 
    const modules = await coursesClient.findModulesForCourse(cid as string); 
    dispatch(setModules(modules)); 
  }; 
  useEffect(() => { 
    fetchModules(); 
  }, []); 

  const saveModule = async (module: any) => { 
    await modulesClient.updateModule(module); 
    dispatch(updateModule(module)); 
  }; 

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse} 
      />
      <br />
      <br />
      <br />

      {modules
  // .filter((module: any) => module.course == cid)
  .map((module: any) => (
    <ListGroup key={module._id} className="rounded-0 mb-5" id="wd-modules">
      <ListGroup.Item className="wd-module p-0 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" /> 
          {!module.editing ? (
            module.name
          ) : (
            <input
              className="form-control w-50 d-inline-block"
              value={module.name}  // Controlled input prevents duplication
              onChange={(e) =>
                dispatch(updateModule({ ...module, name: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // dispatch(updateModule({ ...module, editing: false }));

                  saveModule({ ...module, editing: false }); 
                }
              }}
            />
          )}
          <ModuleControlButtons
            moduleId={module._id}
            // deleteModule={(moduleId: any) => dispatch(deleteModule(moduleId))}
            deleteModule={(moduleId) => removeModule(moduleId)} 

            editModule={(moduleId: any) => dispatch(editModule(moduleId))}
          />
        </div>
      </ListGroup.Item>
      {module.lessons &&
        module.lessons.map((lesson: any) => (
          <ListGroup key={lesson._id} className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" /> {lesson.name}
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        ))}
    </ListGroup>
  ))}

    </div>
  );
}