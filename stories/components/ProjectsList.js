import PropTypes from "prop-types";
import React from "react";

import { UI_URL } from "../settings";

const ProjectsList = ({ data }) => (
  <ul>
    {data.map(item => (
      <li key={item.slug}>
        <a href={`${UI_URL}/projects/#${item.slug}`}>{item.title}</a>
      </li>
    ))}
  </ul>
);

ProjectsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  )
};

export default ProjectsList;
