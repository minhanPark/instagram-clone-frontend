import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Runningstagram</title>
    </Helmet>
  );
};

export default PageTitle;
