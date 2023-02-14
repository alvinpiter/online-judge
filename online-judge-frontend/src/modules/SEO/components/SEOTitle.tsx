import { FC } from "react";
import { Helmet } from "react-helmet-async";

interface SEOTitleProps {
  title: string;
}

export const SEOTitle: FC<SEOTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Online Judge </title>

      <meta name="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  );
};
