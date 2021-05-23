import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState?.errors?.firstName?.message)}
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <FormError message={formState?.errors?.lastName?.message} />
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
          <Input
            type="text"
            placeholder="Email"
            hasError={Boolean(formState?.errors?.email?.message)}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <FormError message={formState?.errors?.email?.message} />
          <Input
            type="text"
            placeholder="Username"
            hasError={Boolean(formState?.errors?.username?.message)}
            {...register("username", {
              required: "Usernmae is required",
            })}
          />
          <FormError message={formState?.errors?.username?.message} />
          <Input
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password?.message)}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <FormError message={formState?.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account ?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};

export default SignUp;
