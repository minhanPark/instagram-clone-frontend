import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const Login = () => {
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    clearErrors,
    setError,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    logUserIn(token);
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
    trigger();
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="Username"
            hasError={Boolean(formState?.errors?.username?.message)}
            onFocus={clearLoginError}
            {...register("username", {
              required: "Username required",
              minLength: {
                value: 5,
                message: "at least five",
              },
            })}
          />
          <FormError message={formState?.errors?.username?.message} />
          <Input
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password?.message)}
            onFocus={clearLoginError}
            {...register("password", { required: "Password required" })}
          />
          <FormError message={formState?.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState?.errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account ?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
};

export default Login;
