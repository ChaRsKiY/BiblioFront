import {Link} from "react-router-dom";

const AdminSideBarLink = ({ path, icon, text, listClasses, pathname }) => {
    return (
        <Link to={`/admin/${path}`}
              className={pathname === `/admin/${path}` ? listClasses.selected : listClasses.normal}>
            {icon}
            <span>{text}</span>
        </Link>
    )
}

export default AdminSideBarLink