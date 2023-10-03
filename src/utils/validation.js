export const checkValidData = (email,password,name) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isName = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(name);

    if(!isEmailValid) {
        return "Email Id is Not Valid!"
    }
    if(!isPasswordValid) {
        return "Password is Not Valid!"
    }
    if(!isName) {
        return "Name is Not Valid!"
    }
    return null;
}