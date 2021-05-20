import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return <Helmet>{title} | Runningstagram</Helmet>;
};

export default PageTitle;
