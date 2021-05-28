import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos(page: $page) {
        ...PhotoFragment
      }
      totalFollowings
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
      page: 1,
    },
  });
  console.log(data);
  return "Profile";
};

export default Profile;
