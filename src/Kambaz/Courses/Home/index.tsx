import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    // <table id="wd-home">
    //   <tr>
    //     <td valign="top">
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-3">
      <Modules />
      </div>

     
      {/* // </td> */}
      {/* // <td valign="top"> */}
      <div className="d-none d-xl-block">

        <CourseStatus />
      </div>
    </div >

    //     </td>
    //   </tr>
    // </table>
  );
}

