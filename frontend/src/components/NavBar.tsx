import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: User | null;
    onSignUpclicked: () => void;
    onLoginClicked: () => void;
    onLogoutSuccessful: () => void;
}

const NavBar = ({
    loggedInUser,
    onSignUpclicked,
    onLoginClicked,
    onLogoutSuccessful,
}: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser ? (
                            <NavBarLoggedInView
                                user={loggedInUser}
                                onLogoutSuccessful={onLogoutSuccessful}
                            />
                        ) : (
                            <NavBarLoggedOutView
                                onSignUpClicked={onSignUpclicked}
                                onLoginClicked={onLoginClicked}
                            />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
