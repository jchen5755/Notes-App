import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User;
    onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
    user,
    onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <>
            <Navbar className="me-2">Signed in as: {user.username}</Navbar>
            <Button onClick={logout}>Log out</Button>
        </>
    );
};

export default NavBarLoggedInView;
