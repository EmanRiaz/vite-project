import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedIn ", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
            } else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [authorizationToken]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
