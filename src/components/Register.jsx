// ** React Imports
import { useState } from "react";

// Parse import
import Parse from "parse";

// ** Material UI Imports
import { FormControl, Typography, Stack } from "@mui/material";

// ** Styled Components
import { FormBox, FormInput, FormButton } from "./styledComponents";

// ** Register Page Component
const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailConfirm, setUserEmailConfirm] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [userPassWordConfirm, setUserPassWordConfirm] = useState("");

  const doUserSignUp = async function () {
    const usernameValue = userName;
    const passwordValue = userPassWord;
    const emailValue = userEmail;
    return await Parse.User.signUp(usernameValue, passwordValue, {
      email: emailValue,
    })
      .then(async (createdUser) => {
        alert(
          `Success!", User ${createdUser.get(
            "username"
          )} was successfully created! Verify your email to login`
        );
        await Parse.User.logOut();
        return true;
      })
      .catch((error) => {
        alert(`Error!, ${error.message}`);
        return false;
      });
  };

  // ** JSX Render for Register
  return (
    <Stack spacing={6}>
      <Typography variant="h2" fontFamily={"Lobster"} color={"#ffffff"}>
        Register
      </Typography>
      <FormBox
        minWidth={{ xs: "80vw", sm: 350 }}
        component={"form"}
        noValidate
        autocomplete={"off"}
      >
        <FormControl>
          <Typography variant="h6" fontFamily={"Lobster"} color="#ffffff">
            Username
          </Typography>
          <FormInput
            disableUnderline
            color={"secondary"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Typography variant="h6" fontFamily={"Lobster"} color="#ffffff">
            Email
          </Typography>
          <FormInput
            disableUnderline
            color={"secondary"}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Typography variant="h6" fontFamily={"Lobster"} color="#ffffff">
            Email confirmation
          </Typography>
          <FormInput
            disableUnderline
            color={"secondary"}
            value={userEmailConfirm}
            onChange={(e) => setUserEmailConfirm(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Typography variant="h6" fontFamily={"Lobster"} color="#ffffff">
            Password
          </Typography>
          <FormInput
            disableUnderline
            type="password"
            value={userPassWord}
            onChange={(e) => setUserPassWord(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Typography variant="h6" fontFamily={"Lobster"} color="#ffffff">
            Password confirmation
          </Typography>
          <FormInput
            disableUnderline
            type="password"
            value={userPassWordConfirm}
            onChange={(e) => setUserPassWordConfirm(e.target.value)}
          />
        </FormControl>
        <FormButton
          color="secondary"
          variant={"contained"}
          onClick={() => doUserSignUp()}
        >
          Register
        </FormButton>
      </FormBox>
    </Stack>
  );
};

export default Register;
